import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNewsCategoryCommand } from '@/features/news/news-category/commands/delete-news-category/delete-news-category.command';
import { NewsCategory } from '@/features/news/news-category/news-category.entity';
import { News } from '@/features/news/news/news.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteNewsCategoryCommand)
export class DeleteNewsCategoryHandler implements ICommandHandler<DeleteNewsCategoryCommand> {
  async execute(cmd: DeleteNewsCategoryCommand): Promise<void> {
    const category = await NewsCategory.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('Category with given id not found');

    const hasAnyAttachedNews = await News.existsBy({ categoryId: cmd.id });
    if (hasAnyAttachedNews) throw new BadRequestException('Category has attached News, move or delete them first');

    await NewsCategory.remove(category);
  }
}
