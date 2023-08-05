import { Note } from "./note.entity";
import { Category } from "../category/category.entity";
import { EditNoteDto } from "./dto/edit-note.dto";
import { CreateNoteDto } from "./dto/create-note.dto";
export declare class NoteService {
    private noteRepository;
    private categoryRepository;
    constructor(noteRepository: typeof Note, categoryRepository: typeof Category);
    getNotes(): Promise<Array<Note>>;
    getNoteById(id: string): Promise<Note | null>;
    createNote(body: CreateNoteDto): Promise<Note | null>;
    deleteNote(id: string): Promise<void>;
    getStats(): Promise<{
        note_count: number;
        archived_note_count: number;
        unarchived_note_count: number;
    }>;
    editNote(id: string, body: EditNoteDto): Promise<Note>;
}
