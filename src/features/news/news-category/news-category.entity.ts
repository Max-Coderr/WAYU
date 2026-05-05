import { Column, Entity, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import { BaseModel } from '@/core/base-model';
import { News } from '@/features/news/news/news.entity';

@Entity('news_categories')
export class NewsCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title!: string;

  @OneToMany(() => News, (news) => news.category)
  news?: Relation<News[]>;
}
