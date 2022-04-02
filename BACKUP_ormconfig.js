/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
console.log(process.env)
module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "blog_server",
  // synchronize: false,
  logging: false,
  entities: ["src/typeorm/entities/**/*.{.ts,.js}"],
  // entities: ['src/typeorm/entities/**/*.ts'],
  migrations: ["src/typeorm/migrations/**/*.ts"],
  subscribers: ["src/typeorm/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/typeorm/entities/",
    migrationsDir: "src/typeorm/migrations",
    subscribersDir: "src/typeorm/subscriber",
  },
};


// PG_HOST=localhost
// PG_PORT=5432
// POSTGRES_USER=postgres
// POSTGRES_PASSWORD=root
// POSTGRES_DB=blog_server