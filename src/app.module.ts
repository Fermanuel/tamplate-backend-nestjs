import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DbModule, 
    AuthModule, 
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
