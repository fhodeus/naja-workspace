import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigFactory } from './config/postgres.config.service';
import { Module } from '@nestjs/common';
import { CacheConfigFactory } from './config/cache.config.service';
import { MongoConfigFactory } from './config/mongo.config.service';
import { UserModule } from './module/user/user.module';
import { PetsModule } from './module/pets/pets.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CacheModule.registerAsync({
            useFactory: CacheConfigFactory,
            imports: [ConfigModule],
            inject: [ConfigService],
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useFactory: PostgresConfigFactory,
            imports: [ConfigModule],
            inject: [ConfigService],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: MongoConfigFactory,
            inject: [ConfigService],
        }),
        UserModule,
        PetsModule,
    ],
})
export class AppModule {}
