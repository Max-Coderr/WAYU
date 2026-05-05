import { Command } from '@nestjs/cqrs';
import { CreateNewsResponse } from '@/features/news/news/admin/create-news/create-news.response';

export class CreateNewsCommand extends Command<CreateNewsResponse> {
  constructor(
    public categoryId: number,
    public title: string,
    public image: Express.Multer.File,
  ) {
    super();
  }
}
