import { Injectable } from '@nestjs/common';
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
}
