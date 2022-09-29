import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
} from "class-validator";
import { NotesCategory } from "../../models/NotesModels";

export class EditNoteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(Object.keys(NotesCategory))
  category: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  isArchived: boolean;
}


export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.keys(NotesCategory))
  category: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  isArchived: boolean;
}
