import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RecordsService } from './records.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createRecord(
    @Req() req,
    @Body() body: { title: string; content: string },
  ) {
    return this.recordsService.createRecord(
      req.user.sub,
      body.title,
      body.content,
    );
  }
  @Get()
@UseGuards(JwtAuthGuard)
getMyRecords(@Req() req) {
  return this.recordsService.getMyRecords(req.user.sub);
}


  
}