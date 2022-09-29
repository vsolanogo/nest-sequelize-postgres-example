import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Note } from "../models/NotesModels";
import { EditNoteDto, CreateNoteDto } from "./dto/notes.dto";

@Controller("notes")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/stats")
  getStats(): any {
    return this.appService.getStats();
  }

  @Get()
  getNotes(): Array<Note> {
    return this.appService.getNotes();
  }

  @Get("/:id")
  getNoteById(@Param("id") id: string): Note | null {
    return this.appService.getNoteById(id);
  }

  @Post()
  createNote(@Body() body: CreateNoteDto): Note {
    return this.appService.createNote(body);
  }

  @Delete("/:id")
  deleteNote(@Param("id") id: string) {
    this.appService.deleteNote(id);
  }

  @Patch("/:id")
  editNote(@Param("id") id: string, @Body() body: EditNoteDto) {
    this.appService.editNote(id, body);
  }
}
