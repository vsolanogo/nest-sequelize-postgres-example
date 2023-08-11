import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, HttpStatus } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { CreateNoteDto } from "../src/note/dto/create-note.dto";
import { v4 as uuidv4 } from "uuid";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("/notes (POST)", async () => {
    const newCategory = {
      name: uuidv4(),
    };

    const responseCategory = await request(app.getHttpServer())
      .post("/categories")
      .send(newCategory)
      .expect(HttpStatus.CREATED);

    const newNoteDto: CreateNoteDto = {
      name: "Test Note",
      category: responseCategory.body.name,
      content: "This is a test note content.",
      isArchived: false,
    };

    const responseNote = await request(app.getHttpServer())
      .post("/notes")
      .send(newNoteDto)
      .expect(HttpStatus.CREATED);

    expect(responseNote.body.id).toBeDefined();
    expect(responseNote.body.name).toBe(newNoteDto.name);
    expect(responseNote.body.category).toBe(responseCategory.body.id);
    expect(responseNote.body.content).toBe(newNoteDto.content);
    expect(responseNote.body.isArchived).toBe(newNoteDto.isArchived);
  });

  it("/categories (POST)", async () => {
    const newCategory = {
      name: uuidv4(),
    };

    const response = await request(app.getHttpServer())
      .post("/categories")
      .send(newCategory)
      .expect(HttpStatus.CREATED);

    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(newCategory.name);
  });

  it("/notes/:id (PATCH)", async () => {
    const categoryName = uuidv4();
    const newCategory = { name: categoryName };
    const responseCategory = await request(app.getHttpServer())
      .post("/categories")
      .send(newCategory)
      .expect(HttpStatus.CREATED);

    const newNoteDto: CreateNoteDto = {
      name: "Test Note",
      category: responseCategory.body.name,
      content: "This is a test note content.",
      isArchived: false,
    };

    const responseNote = await request(app.getHttpServer())
      .post("/notes")
      .send(newNoteDto)
      .expect(HttpStatus.CREATED);

    const updatedNoteDto: CreateNoteDto = {
      name: "Updated Note",
      category: responseCategory.body.name,
      content: "Updated test note content.",
      isArchived: true,
    };

    const responseUpdate = await request(app.getHttpServer())
      .patch(`/notes/${responseNote.body.id}`)
      .send(updatedNoteDto)
      .expect(HttpStatus.OK);

    expect(responseUpdate.body.id).toBe(responseNote.body.id);
    expect(responseUpdate.body.name).toBe(updatedNoteDto.name);
    expect(responseUpdate.body.content).toBe(updatedNoteDto.content);
    expect(responseUpdate.body.isArchived).toBe(updatedNoteDto.isArchived);
  });

  it("/notes/:id (GET)", async () => {
    const categoryName = uuidv4();
    const newCategory = { name: categoryName };
    const responseCategory = await request(app.getHttpServer())
      .post("/categories")
      .send(newCategory)
      .expect(HttpStatus.CREATED);

    const newNoteDto: CreateNoteDto = {
      name: "Test Note",
      category: responseCategory.body.name,
      content: "This is a test note content.",
      isArchived: false,
    };

    const responseNote = await request(app.getHttpServer())
      .post("/notes")
      .send(newNoteDto)
      .expect(HttpStatus.CREATED);

    const responseGet = await request(app.getHttpServer())
      .get(`/notes/${responseNote.body.id}`)
      .expect(HttpStatus.OK);

    expect(responseGet.body.id).toBe(responseNote.body.id);
    expect(responseGet.body.name).toBe(newNoteDto.name);
    expect(responseGet.body.category).toBe(responseCategory.body.id);
    expect(responseGet.body.content).toBe(newNoteDto.content);
    expect(responseGet.body.isArchived).toBe(newNoteDto.isArchived);
  });

  it("/notes/:nonexistentId (GET)", async () => {
    const nonexistentId = 999999999;

    const response = await request(app.getHttpServer())
      .get(`/notes/${nonexistentId}`)
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body.message).toBe("Note not found");
  });

  it("/notes (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/notes")
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const note = response.body[0];

      expect(note.id).toBeDefined();
      expect(note.name).toBeDefined();
      expect(note.category).toBeDefined();
      expect(note.content).toBeDefined();
      expect(note.isArchived).toBeDefined();
      if (note.dates !== null) {
        expect(Array.isArray(note.dates)).toBeTruthy();
        for (const date of note.dates) {
          expect(typeof date).toBe("string");
        }
      } else {
        expect(note.dates).toBeNull();
      }
    }
  });

  it("/notes/stats (GET)", async () => {
    const response = await request(app.getHttpServer())
      .get("/notes/stats")
      .expect(HttpStatus.OK);

    expect(typeof response.body.note_count).toBe("number");
    expect(typeof response.body.archived_note_count).toBe("number");
    expect(typeof response.body.unarchived_note_count).toBe("number");
  });
});
