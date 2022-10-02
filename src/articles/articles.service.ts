import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async create(articleDto: CreateArticleDto, user) {
    const newArticle = this.articleRepository.create({
      ...articleDto,
      author: user,
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
      relations: ['author'],
    });
    return articles;
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
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
