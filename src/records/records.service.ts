import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Injectable()
export class RecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRecord(userId: string, title: string, content: string) {
    return this.prisma.record.create({
      data: {
        title,
        content,
        userId,
      },
    });
  }

  async getMyRecords(
  userId: string,
  search?: string,
  page = 1,
  limit = 10,
) {
  const skip = (page - 1) * limit;

  return this.prisma.record.findMany({
    where: {
      userId,
      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                content: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {}),
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take: limit,
  });
}
  async updateRecord(
    userId: string,
    recordId: string,
    title?: string,
    content?: string,
  ) {
    const record = await this.prisma.record.findFirst({
      where: {
        id: recordId,
        userId,
      },
    });

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.record.update({
      where: {
        id: recordId,
      },
      data: {
        title,
        content,
      },
    });
  }

  async deleteRecord(userId: string, recordId: string) {
    const record = await this.prisma.record.findFirst({
      where: {
        id: recordId,
        userId,
      },
    });

    if (!record) {
      throw new NotFoundException('Record not found');
    }

    return this.prisma.record.delete({
      where: {
        id: recordId,
      },
    });
  }

  async getAllRecordsForAdmin() {
    return this.prisma.record.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
