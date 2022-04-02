import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from "path";
console.log(path.join(__dirname, '../entities/**/*.ts'))
const config: ConnectionOptions = {
  type: 'postgres',
  // host: process.env.TYPEORM_HOST,
  // port: Number(process.env.TYPEORM_PORT),
  // username: process.env.TYPEORM_USERNAME,
  // password: process.env.TYPEORM_PASSWORD,
  // database: process.env.TYPEORM_DATABASE,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "blog_server",
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, '../entities/**/*.ts'), path.join(__dirname, '../../../dist/typeorm/entities/**/*.js')],
  // entities: ['src/typeorm/entities/**/*.ts'],
  // entities: ['src/typeorm/entities/**/*.ts'],
  migrations: [path.join(__dirname, '../migrations/**/*.ts')],
  subscribers: [path.join(__dirname, '../subscriber/**/*.ts')],
  cli: {
    entitiesDir: path.join(__dirname, '../entities'),
    migrationsDir: path.join(__dirname, '../migrations'),
    subscribersDir: path.join(__dirname, '../subscriber'),
  },
  // namingStrategy: new SnakeNamingStrategy(),
};

// console.log(config);
export default config;
