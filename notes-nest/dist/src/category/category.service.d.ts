import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: typeof Category);
    createCategory(body: CreateCategoryDto): Promise<Category>;
    getCategoryById(id: number): Promise<Category>;
}
