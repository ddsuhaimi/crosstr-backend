# Scripts comments
start:dev

Use require tsconfig-paths/register so we can resolve  baseUrl and paths. Check more on: 
- https://medium.com/@fmoessle/typescript-paths-with-ts-node-ts-node-dev-and-jest-671deacf6428
- https://github.com/TypeStrong/ts-node#paths-and-baseurl

migrate:generate

Must explicitly add -d ./src/typeorm/migrations. Check more on:
- https://stackoverflow.com/questions/63838204/error-when-creating-a-new-migration-using-typeorm-and-nestjs-with-typescript