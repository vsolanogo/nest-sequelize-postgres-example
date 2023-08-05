import { Module } from "@nestjs/common";
import { NoteService } from "./note.service";
import { DbModule } from "../db/db.module";
import { NoteController } from "./note.controller";
import { categoryProviders } from "../category/category.providers";
import { noteProviders } from "./note.providers";

@Module({
  imports: [DbModule],
  controllers: [NoteController],
  providers: [...categoryProviders, ...noteProviders, NoteService],
})
export class NoteModule {}
