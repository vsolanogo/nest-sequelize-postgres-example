import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(body: CreateCategoryDto): Promise<any>;
    getCategoryById(id: string): Promise<any>;
}
