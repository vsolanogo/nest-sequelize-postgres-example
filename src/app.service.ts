import { Injectable, NotFoundException } from "@nestjs/common";
import { NoteCreatorParams, NotesCategory, Note } from "../models/NotesModels";
import { createNote } from "./notesCreator";
import { getDates } from "./notesCreator";

const initialData: Array<NoteCreatorParams> = [
  {
    name: `test name`,
    createdAt: new Date(1643618202000),
    category: NotesCategory.RANDOM_THOUGHT,
    content: `test content 5/5/2002`,
    isArchived: true,
  },
  {
    name: `test name2`,
    createdAt: new Date(1643684526000),
    category: NotesCategory.RANDOM_THOUGHT,
    content: `test content2 5/12/2022 10/10/2002 10/10/2009`,
    isArchived: false,
  },
  {
    name: `test name4`,
    createdAt: new Date(1603681095000),
    category: NotesCategory.TASK,
    content: `test content4`,
    isArchived: false,
  },
  {
    name: `test name3`,
    createdAt: new Date(1643681095000),
    category: NotesCategory.IDEA,
    content: `test content3`,
    isArchived: false,
  },
  {
    name: `test name5`,
    createdAt: new Date(1649681095000),
    category: NotesCategory.RANDOM_THOUGHT,
    content: ` asdfas 3/3/2020 asdfa 3/3/2020 asdfa `,
    isArchived: false,
  },
  {
    name: `test name6`,
    createdAt: new Date(1649683095000),
    category: NotesCategory.RANDOM_THOUGHT,
    content: `test content6`,
    isArchived: true,
  },
];

let notes: Array<Note> = initialData.map((i) => createNote(i));

@Injectable()
export class AppService {
  getNotes(): Array<Note> {
    return notes;
  }

  getNoteById(id: string): Note | null {
    const res: Note = notes.find((i) => i.id === id);
    if (res) {
      return res;
    }

    throw new NotFoundException("Not found");
  }

  createNote(body: any): Note | null {
    const newNote = createNote(body);
    notes = [...notes, newNote];
    return newNote;
  }

  deleteNote(id: string) {
    const noteToDel = notes.find((i) => i.id === id);
    if (!noteToDel) {
      throw new NotFoundException(`Not found`);
    }
    notes = notes.filter((i) => i.id !== id);
  }

  getStats() {
    return {
      count: notes.length,
      archived: notes.filter((i) => i.isArchived).length,
      unarchived: notes.filter((i) => !i.isArchived).length,
    };
  }

  editNote(id, body) {
    const noteToEdit = notes.find((i) => i.id === id);
    if (!noteToEdit) {
      throw new NotFoundException(`Not found`);
    }

    notes = notes.map((i) => {
      if (i.id === id) {
        return {
          ...i,
          name: body.name ?? i.name,
          category: body.category ?? i.category,
          content: body.content ?? i.content,
          dates: getDates(body.content ?? i.content),
          isArchived: body.isArchived ?? i.isArchived,
        };
      }
      return i;
    });
  }
}
