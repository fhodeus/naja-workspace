import type { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

export const MongoConfigFactory = (configService: ConfigService): TypeOrmModuleOptions => {
    const entities = getMetadataArgsStorage()
        .tables.map((tbl) => tbl.target)
        .filter((entity) => entity.toString().toLowerCase().includes('entity'));

    return {
        type: 'mongodb',
        url: `mongodb://${configService.get<string>('DB-NOSQL_HOST')}:${configService.get<string>('DB-NOSQL_PORT')}`,
        database: configService.get<string>('DB-NOSQL_DATABASE'),
        entities,
        logging: true,
        autoLoadEntities: true,
    };
};
