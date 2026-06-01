import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  s3key: string;

  @Column({ default: false })
  assigned: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
