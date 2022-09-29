export interface Note {
  id: string;
  createdAt: Date;
  name: string;
  category: NotesCategory;
  content: string;
  dates: Array<string> | null;
  isArchived: boolean;
}

export enum NotesCategory {
  TASK = `Task`,
  RANDOM_THOUGHT = `Random Thought`,
  IDEA = `Idea`,
}

export interface NoteCreatorParams {
  name: string;
  category: NotesCategory;
  content: string;
  isArchived?: boolean;
  createdAt?: Date;
}
