import { Connection, createConnection, getConnectionOptions } from 'typeorm';

import config from './config/ormconfig';

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    // await conn.synchronize();
    console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    return conn
    // console.log('options', options)
  } catch (err) {
    console.log(err);
  }
  return null;
};
