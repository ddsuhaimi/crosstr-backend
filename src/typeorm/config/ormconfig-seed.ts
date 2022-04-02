import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const configSeed: ConnectionOptions = {
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "blog_server",
  synchronize: false,
  logging: false,
  entities: ['src/typeorm/entities/**/*.ts'],
  migrations: ['src/typeorm/seeds/**/*.ts'],
  cli: {
    migrationsDir: 'src/typeorm/seeds',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export default configSeed;
