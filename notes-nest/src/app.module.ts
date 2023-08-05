import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from "./db/db.module";
import { NoteModule } from "./note/note.module";
import { CategoryModule } from "./category/category.module";
import { DataSeedModule } from "./dataseed/dataseed.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: !!process.env.NODE_ENV,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DbModule,
    NoteModule,
    CategoryModule,
    DataSeedModule,
  ],
})
export class AppModule {}
