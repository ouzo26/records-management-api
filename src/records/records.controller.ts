import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createRecord(@Req() req, @Body() body: { title: string; content: string }) {
    return this.recordsService.createRecord(
      req.user.sub,
      body.title,
      body.content,
    );
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  getMyRecords(@Req() req, @Query('search') search?: string) {
    return this.recordsService.getMyRecords(req.user.sub, search);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateRecord(
    @Req() req,
    @Param('id') id: string,
    @Body() body: { title?: string; content?: string },
  ) {
    return this.recordsService.updateRecord(
      req.user.sub,
      id,
      body.title,
      body.content,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteRecord(@Req() req, @Param('id') id: string) {
    return this.recordsService.deleteRecord(req.user.sub, id);
  }

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAllRecordsForAdmin() {
    return this.recordsService.getAllRecordsForAdmin();
  }
}
