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
import { User } from '../users/User';

@Entity('userTokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    // unique: true,
  })
  refreshToken: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;

  //   setLanguage(language: Language) {
  //     this.language = language;
  //   }

  //   hashPassword() {
  //     this.password = bcrypt.hashSync(this.password, 8);
  //   }

  //   checkIfPasswordMatch(unencryptedPassword: string) {
  //     return bcrypt.compareSync(unencryptedPassword, this.password);
  //   }
}
