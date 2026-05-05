import { Column, Entity, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { NewsCategory } from '@/features/news/news-category/news-category.entity';

@Entity('news')
export class News extends BaseModel {
  @Column()
  categoryId!: number;

  @ManyToOne(() => NewsCategory, (newsCategory) => newsCategory.news, { onDelete: 'RESTRICT' })
  category?: Relation<NewsCategory>;

  @Column({ length: 256 })
  title!: string;

  @Column({ length: 256 })
  image!: string;
}
