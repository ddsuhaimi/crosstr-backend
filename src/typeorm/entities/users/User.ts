import bcrypt from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Post } from '../posts/Post';

import { Role, Language } from './types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    // unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: '',
  })
  firstName: string;

  @Column({
    nullable: true,
    default: '',
  })
  lastName: string;

  @Column({
    default: 'STANDARD' as Role,
    length: 30,
  })
  role: string;

  @Column({
    default: 'en-US' as Language,
    length: 15,
  })
  language: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  setLanguage(language: Language) {
    this.language = language;
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  toJSON() {
    delete this.password;
    return this;
  }
}