import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @Inject("CATEGORY_REPOSITORY")
    private readonly categoryRepository: typeof Category
  ) {}

  async createCategory(body: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: body.name },
    });

    if (existingCategory) {
      throw new HttpException(
        "A category with this name already exists",
        HttpStatus.CONFLICT
      );
    }

    const category = new Category();
    category.name = body.name;
    return category.save();
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findByPk<Category>(id);

    if (!category) {
      throw new HttpException("No category found", HttpStatus.NOT_FOUND);
    }
    return category;
  }
}
