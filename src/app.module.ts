import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { BookModule } from './modules/books/book.module';
import { ProtectedModule } from './modules/auth/protected/protected.module';
import { dataSourceOptions } from 'db/data-source';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
    UserModule,
    BookModule, 
    ProtectedModule
    ],
})
export class AppModule {}
