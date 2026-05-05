import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNewsRequest } from '@/features/news/news/admin/create-news/create-news.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateNewsCommand } from '@/features/news/news/admin/create-news/create-news.command';
import { ApiConsumes } from '@nestjs/swagger';
import { storageOptions } from '@/configs/multer.config';
import fs from 'fs';

@Controller('admin/news')
export class NewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 5 } }))
  async createNews(@Body() payload: CreateNewsRequest, @UploadedFile() image: Express.Multer.File) {
    const cmd = new CreateNewsCommand(payload.categoryId, payload.title, image);
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }
}
