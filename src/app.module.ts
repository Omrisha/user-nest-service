import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "nest_users",
    entities: ["dist/**/**.entity{.ts,.js"],
    autoLoadEntities: true,
    synchronize: true,
    logging: true
}), UsersModule]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes('*');
  }
}
