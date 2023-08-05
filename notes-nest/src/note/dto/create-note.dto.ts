import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  isArchived: boolean;
}
