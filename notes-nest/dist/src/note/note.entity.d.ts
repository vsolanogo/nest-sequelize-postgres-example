import { Model } from "sequelize-typescript";
import { Category } from "../category/category.entity";
export declare class Note extends Model<Note> {
    id: number;
    name: string;
    createdAt: Date;
    deletedAt: Date;
    category: number;
    categoryData: Category;
    content: string;
    dates: Array<string>;
    isArchived: boolean;
}
