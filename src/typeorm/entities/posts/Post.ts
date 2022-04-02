import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

// import { PostPublishSetting } from '../postPublishSettings/PostPublishSetting';
import { User } from '../users/User';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;

  // @OneToMany((type) => PostPublishSetting, (postPublishSetting) => postPublishSetting.post)
  // post_publish_settings: PostPublishSetting[];

  // @OneToMany((type) => PostPublishSetting, (postPublishSetting) => postPublishSetting.post)
  // publish_settings: PostPublishSetting[];

  // @OneToMany(() => PostPublishSetting, (postPublishSetting) => postPublishSetting.post)
  // publishSettings: PostPublishSetting[];
}
