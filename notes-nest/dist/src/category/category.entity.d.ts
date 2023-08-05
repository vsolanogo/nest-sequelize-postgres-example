import { Model } from "sequelize-typescript";
import { Note } from "../note/note.entity";
export declare class Category extends Model<Category> {
    id: number;
    name: string;
    notes: Note[];
}
