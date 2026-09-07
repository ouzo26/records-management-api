import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyProfile(userId: string) {
    return this.prisma.profile.findUnique({
      where: {
        userId,
      },
    });
  }

async updateMyProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.prisma.profile.upsert({
      where: {
        userId,
      },
      update: {
        firstName: updateProfileDto.firstName,
        lastName: updateProfileDto.lastName,
        phone: updateProfileDto.phone,
        address: updateProfileDto.address,
        bio: updateProfileDto.bio,
      },
      create: {
        userId,
        firstName: updateProfileDto.firstName,
        lastName: updateProfileDto.lastName,
        phone: updateProfileDto.phone,
        address: updateProfileDto.address,
        bio: updateProfileDto.bio,
      },
    });
  }
}