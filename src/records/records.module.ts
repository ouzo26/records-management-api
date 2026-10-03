import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}