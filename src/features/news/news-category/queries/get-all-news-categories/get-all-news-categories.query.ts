import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoriesResponse } from './get-all-news-categories.response';
import { GetAllNewsCategoriesFilters } from '@/features/news/news-category/queries/get-all-news-categories/get-all-news-categories.filters';

export class GetAllNewsCategoriesQuery extends Query<GetAllNewsCategoriesResponse[]> {
  constructor(public readonly filters: GetAllNewsCategoriesFilters) {
    super();
  }
}
