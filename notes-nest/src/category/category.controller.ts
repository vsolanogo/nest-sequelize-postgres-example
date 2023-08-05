import { Controller, Body, Post, Get, Param } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() body: CreateCategoryDto): Promise<any> {
    return this.categoryService.createCategory(body);
  }

  @Get("/:id")
  async getCategoryById(@Param("id") id: string): Promise<any> {
    return this.categoryService.getCategoryById(+id);
  }
}
