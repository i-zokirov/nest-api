import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async create(articleDto: CreateArticleDto) {
    const newArticle = this.articleRepository.create({
      ...articleDto,
      createdAt: new Date(),
    });
    await this.articleRepository.save(newArticle);
    return newArticle;
  }
  async findAll() {
    const articles = await this.articleRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return articles;
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: {
        id,
      },
    });
    if (article) {
      return article;
    }
    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, updateArticleDto);
    const updatedTodo = await this.articleRepository.findOne({ where: { id } });
    if (updatedTodo) {
      return updatedTodo;
    }

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number) {
    const deletedTodo = await this.articleRepository.delete(id);
    if (!deletedTodo.affected) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
  }
}
