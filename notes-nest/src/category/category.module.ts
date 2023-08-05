import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { DbModule } from "../db/db.module";
import { CategoryController } from "./category.controller";
import { categoryProviders } from "./category.providers";

@Module({
  imports: [DbModule],
  controllers: [CategoryController],
  providers: [...categoryProviders, CategoryService],
})
export class CategoryModule {}
