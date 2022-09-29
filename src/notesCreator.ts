import { v4 as uuidv4 } from "uuid";
import { NoteCreatorParams, Note } from "../models/NotesModels";

export const getDates = (str: string): Array<string> | null => {
  return str ? str.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g) : null;
};

export function createNote(notesParam: NoteCreatorParams): Note {
  return {
    id: uuidv4(),
    name: notesParam.name,
    createdAt: notesParam.createdAt ?? new Date(),
    category: notesParam.category,
    content: notesParam.content,
    dates: getDates(notesParam.content),
    isArchived: notesParam.isArchived ?? false,
  };
}
