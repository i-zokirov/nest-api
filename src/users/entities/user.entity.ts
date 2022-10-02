import { ArticleEntity } from 'src/articles/entities/article.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: '' })
  name: string;
  @Column({ default: '', unique: true })
  username: string;
  @Column({ default: '' })
  password: string;
  @Column({ default: false })
  isAdmin: boolean;
  @OneToMany(() => ArticleEntity, (articleEntity) => articleEntity.author)
  articles: ArticleEntity[];
}
