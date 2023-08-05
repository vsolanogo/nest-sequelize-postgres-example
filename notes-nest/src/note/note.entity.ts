import {
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { Category } from "../category/category.entity";

@Table
export class Note extends Model<Note> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  createdAt: Date;

  @Column
  deletedAt: Date;

  @ForeignKey(() => Category)
  @Column
  category: number;

  @BelongsTo(() => Category)
  categoryData: Category;

  @Column
  content: string;

  @Column({ type: DataType.ARRAY(DataType.JSON), allowNull: true })
  dates: Array<string>;

  @Column
  isArchived: boolean;
}
