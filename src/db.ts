import "reflect-metadata";
import {createConnection, getConnectionOptions, ConnectionOptions} from "typeorm";
import {dbCreateConnection} from './typeorm/dbCreateConnection'
// import config from './typeorm/config/ormconfig'
import { Tedis } from "tedis";
import logger from './shared/Logger';

export async function intializeDB(): Promise<void> {
  const conn = await dbCreateConnection()
  if (conn) {
    
    console.log(conn.options)
  }
  // console.log("config", config)
  // const connection = await createConnection({
  //   type: 'postgres',
  //   host: "localhost",
  //   port: 5432,
  //   username: "postgres",
  //   password: "root",
  //   database: "blog_server",
  //   logging: false,
  //   synchronize: true,
  //   entities: ['src/typeorm/entities/**/*.{.ts,.js}'],
  //   migrations: ['src/typeorm/migrations/**/*.ts'],
  //   subscribers: ['src/typeorm/subscriber/**/*.ts'],
  //   cli: {
  //     entitiesDir: 'src/typeorm/entities/',
  //     migrationsDir: 'src/typeorm/migrations',
  //     subscribersDir: 'src/typeorm/subscriber',}
  //   })
  // const options = await getConnectionOptions()
  // console.log("options", options)
  console.log('Database successfully initialized');
  logger.info('Database successfully initialized');
}

export function initializeCache(port: number | undefined) : unknown {
  const tedis = new Tedis({
    port: port,
    host: "127.0.0.1"
  });
  logger.info('Redis cache successfully initialized');
  return tedis;
}