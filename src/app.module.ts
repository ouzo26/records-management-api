import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [AuthModule, ProfilesModule, RecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
