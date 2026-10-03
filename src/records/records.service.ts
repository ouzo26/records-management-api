import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  async getMyRecords(userId: string) {
    return this.prisma.record.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
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
}
