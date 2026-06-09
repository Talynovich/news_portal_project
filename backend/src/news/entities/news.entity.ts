import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Image } from '../../upload/entities/image.entity';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: number | string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Image, { nullable: true, onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'imageUrl' })
  image: Image;

  @ManyToOne(() => Users, (user) => user.news, { onDelete: 'SET NULL' })
  author: Users;

  @OneToMany(() => Comment, (comments) => comments.news)
  comments: Comment[];

  @AfterLoad()
  convertIdToUrl() {
    if (this.image && this.image.url) {
      this.imageUrl = `${this.image.url}`;
    }
  }
}
