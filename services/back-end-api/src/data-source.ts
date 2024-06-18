import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { env } from './env';

const connectionOptions: DataSourceOptions & SeederOptions = {
    type: env.db.type as any, // See createConnection options for valid types
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    synchronize: env.db.synchronize,
    // logging: env.db.logging,
    entities: env.app.dirs.entities,
    migrations: env.app.dirs.migrations,
    seeds: [],
    subscribers: env.app.dirs.subscribers,
};

export const AppDataSource = new DataSource(connectionOptions);
