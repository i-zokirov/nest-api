import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
