import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyProfile(@Req() req) {
    return this.profilesService.getMyProfile(req.user.sub);
  }


  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateMyProfile(@Req() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.updateMyProfile(
      req.user.sub,
      updateProfileDto,
    );
  }
}


