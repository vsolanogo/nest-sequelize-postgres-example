import { Injectable, Inject } from "@nestjs/common";
import { Category } from "../category/category.entity";
import { Note } from "../note/note.entity";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

@Injectable()
export class DataSeedService {
  constructor(
    @Inject("NOTE_REPOSITORY")
    private noteRepository: typeof Note,
    @Inject("CATEGORY_REPOSITORY")
    private categoryRepository: typeof Category
  ) {}

  async seedDatabase(): Promise<any> {
    const categoriesList: Array<Category> = [];

    for (let i = 0; i < 5; i++) {
      const res = await this.categoryRepository.create({
        name: uuidv4(),
      });

      categoriesList.push(res);
    }

    const notesList: Array<Note> = [];

    for (let i = 0; i < categoriesList.length; i++) {
      const notesBatchPromises = [];

      for (let j = 0; j < 5; j++) {
        console.log(categoriesList[i].id)
        const promise = this.noteRepository.create({
          name: faker.internet.displayName(),
          category: categoriesList[i].id,
          content: faker.location.streetAddress(),
          isArchived: Math.random() < 0.5,
        });
        notesBatchPromises.push(promise);
      }

      const batchResults = await Promise.all(notesBatchPromises);

      notesList.push(...batchResults);
    }

    console.log("Seed completed");
  }
}
