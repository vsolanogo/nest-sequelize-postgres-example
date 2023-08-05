import { Injectable, Inject } from "@nestjs/common";
import { Note } from "./note.entity";
import { Category } from "../category/category.entity";
import { NotFoundException } from "@nestjs/common";
import { EditNoteDto } from "./dto/edit-note.dto";
import { CreateNoteDto } from "./dto/create-note.dto";
import { getDates } from "../helpers";
@Injectable()
export class NoteService {
  constructor(
    @Inject("NOTE_REPOSITORY")
    private noteRepository: typeof Note,
    @Inject("CATEGORY_REPOSITORY")
    private categoryRepository: typeof Category
  ) {}

  async getNotes(): Promise<Array<Note>> {
    const notes = await this.noteRepository.findAll({
      include: [Category],
      attributes: {
        exclude: ["CategoryId", "categoryData"],
      },
    });

    return notes;
  }

  async getNoteById(id: string): Promise<Note | null> {
    const note = await this.noteRepository.findByPk(id, {
      include: [Category],
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    return note;
  }

  async createNote(body: CreateNoteDto): Promise<Note | null> {
    const { name, category, content, isArchived } = body;

    const categoryData = await this.categoryRepository.findOne({
      where: { name: category },
    });

    if (!categoryData) {
      throw new NotFoundException(`Category "${category}" not found`);
    }

    const createdNote = await Note.create({
      name,
      createdAt: new Date(),
      category: categoryData.id,
      content,
      dates: getDates(content),
      isArchived,
    });

    return createdNote;
  }

  async deleteNote(id: string) {
    const deletedRows = await this.noteRepository.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }

  async getStats() {
    const noteCount = await this.noteRepository.count();
    const archivedNoteCount = await this.noteRepository.count({
      where: { isArchived: true },
    });
    const unarchivedNoteCount = await this.noteRepository.count({
      where: { isArchived: false },
    });

    return {
      note_count: noteCount,
      archived_note_count: archivedNoteCount,
      unarchived_note_count: unarchivedNoteCount,
    };
  }

  async editNote(id: string, body: EditNoteDto): Promise<Note> {
    const note = await this.noteRepository.findByPk(id, {
      include: [Category],
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    const { name, category, content, isArchived } = body;

    if (category) {
      const categoryData = await this.categoryRepository.findOne({
        where: { name: category },
      });

      if (!categoryData) {
        throw new NotFoundException(`Category "${category}" not found`);
      }

      note.category = categoryData.id;
    }

    note.name = name || note.name;
    note.content = content || note.content;
    note.dates = getDates(content || note.content);
    note.isArchived = isArchived ?? note.isArchived;

    await note.save();

    return note;
  }
}
