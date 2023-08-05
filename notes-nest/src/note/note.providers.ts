import { Note } from "./note.entity";

export const noteProviders = [{ provide: "NOTE_REPOSITORY", useValue: Note }];
