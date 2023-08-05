import { Model, Column, Table, HasMany } from "sequelize-typescript";
import { Note } from "../note/note.entity";

@Table({ timestamps: false })
export class Category extends Model<Category> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true })
  name: string;

  @HasMany(() => Note)
  notes: Note[];
}
