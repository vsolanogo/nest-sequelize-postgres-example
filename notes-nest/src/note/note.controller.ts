import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
} from "@nestjs/common";
import { NoteService } from "./note.service";
import { Note } from "./note.entity";
import { EditNoteDto } from "./dto/edit-note.dto";
import { CreateNoteDto } from "./dto/create-note.dto";

@Controller("notes")
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get("/stats")
  async getStats(): Promise<any> {
    return this.noteService.getStats();
  }

  @Get()
  async getNotes(): Promise<Array<Note>> {
    return this.noteService.getNotes();
  }

  @Get("/:id")
  async getNoteById(@Param("id") id: string): Promise<Note | null> {
    return this.noteService.getNoteById(id);
  }

  @Post()
  async createNote(@Body() body: CreateNoteDto): Promise<Note> {
    return this.noteService.createNote(body);
  }

  @Delete("/:id")
  async deleteNote(@Param("id") id: string) {
    this.noteService.deleteNote(id);
  }

  @Patch("/:id")
  async editNote(
    @Param("id") id: string,
    @Body() body: EditNoteDto
  ): Promise<Note> {
    return this.noteService.editNote(id, body);
  }
}
