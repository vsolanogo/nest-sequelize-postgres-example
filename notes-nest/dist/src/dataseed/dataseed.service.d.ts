import { Category } from "../category/category.entity";
import { Note } from "../note/note.entity";
export declare class DataSeedService {
    private noteRepository;
    private categoryRepository;
    constructor(noteRepository: typeof Note, categoryRepository: typeof Category);
    seedDatabase(): Promise<any>;
}
