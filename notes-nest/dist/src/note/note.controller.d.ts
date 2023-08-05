import { NoteService } from "./note.service";
import { Note } from "./note.entity";
import { EditNoteDto } from "./dto/edit-note.dto";
import { CreateNoteDto } from "./dto/create-note.dto";
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    getStats(): Promise<any>;
    getNotes(): Promise<Array<Note>>;
    getNoteById(id: string): Promise<Note | null>;
    createNote(body: CreateNoteDto): Promise<Note>;
    deleteNote(id: string): Promise<void>;
    editNote(id: string, body: EditNoteDto): Promise<Note>;
}
