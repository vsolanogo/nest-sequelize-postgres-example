import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class EditNoteDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  isArchived: boolean;
}
