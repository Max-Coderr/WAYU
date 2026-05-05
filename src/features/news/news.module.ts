import { Module } from '@nestjs/common';
import { NewsCategoryController } from '@/features/news/news-category/news-category.controller';
import { CreateNewsCategoryHandler } from '@/features/news/news-category/commands/create-news-category/create-news-category.handler';
import { GetAllNewsCategoriesHandler } from '@/features/news/news-category/queries/get-all-news-categories/get-all-news-categories.handler';
import { DeleteNewsCategoryHandler } from '@/features/news/news-category/commands/delete-news-category/delete-news-category.handler';
import { CreateNewsHandler } from '@/features/news/news/admin/create-news/create-news.handler';
import { NewsController } from '@/features/news/news/news.controller';

@Module({
  controllers: [NewsController, NewsCategoryController],
  providers: [CreateNewsHandler, GetAllNewsCategoriesHandler, CreateNewsCategoryHandler, DeleteNewsCategoryHandler],
})
export class NewsModule {}
