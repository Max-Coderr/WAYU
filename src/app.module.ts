import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { NewsModule } from '@/features/news/news.module';
import { AdminModule } from '@/features/admin/admin.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CqrsModule.forRoot(), AuthModule, NewsModule, AdminModule],
})
export class AppModule {}
