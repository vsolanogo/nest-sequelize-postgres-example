"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteService = void 0;
const common_1 = require("@nestjs/common");
const note_entity_1 = require("./note.entity");
const category_entity_1 = require("../category/category.entity");
const common_2 = require("@nestjs/common");
const helpers_1 = require("../helpers");
let NoteService = class NoteService {
    constructor(noteRepository, categoryRepository) {
        this.noteRepository = noteRepository;
        this.categoryRepository = categoryRepository;
    }
    async getNotes() {
        const notes = await this.noteRepository.findAll({
            include: [category_entity_1.Category],
            attributes: {
                exclude: ["CategoryId", "categoryData"],
            },
        });
        return notes;
    }
    async getNoteById(id) {
        const note = await this.noteRepository.findByPk(id, {
            include: [category_entity_1.Category],
        });
        if (!note) {
            throw new common_2.NotFoundException("Note not found");
        }
        return note;
    }
    async createNote(body) {
        const { name, category, content, isArchived } = body;
        const categoryData = await this.categoryRepository.findOne({
            where: { name: category },
        });
        if (!categoryData) {
            throw new common_2.NotFoundException(`Category "${category}" not found`);
        }
        const createdNote = await note_entity_1.Note.create({
            name,
            createdAt: new Date(),
            category: categoryData.id,
            content,
            dates: (0, helpers_1.getDates)(content),
            isArchived,
        });
        return createdNote;
    }
    async deleteNote(id) {
        const deletedRows = await this.noteRepository.destroy({
            where: { id },
        });
        if (deletedRows === 0) {
            throw new common_2.NotFoundException(`Note with ID ${id} not found`);
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
    async editNote(id, body) {
        const note = await this.noteRepository.findByPk(id, {
            include: [category_entity_1.Category],
        });
        if (!note) {
            throw new common_2.NotFoundException(`Note with ID ${id} not found`);
        }
        const { name, category, content, isArchived } = body;
        if (category) {
            const categoryData = await this.categoryRepository.findOne({
                where: { name: category },
            });
            if (!categoryData) {
                throw new common_2.NotFoundException(`Category "${category}" not found`);
            }
            note.category = categoryData.id;
        }
        note.name = name || note.name;
        note.content = content || note.content;
        note.dates = (0, helpers_1.getDates)(content || note.content);
        note.isArchived = isArchived !== null && isArchived !== void 0 ? isArchived : note.isArchived;
        await note.save();
        return note;
    }
};
NoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("NOTE_REPOSITORY")),
    __param(1, (0, common_1.Inject)("CATEGORY_REPOSITORY")),
    __metadata("design:paramtypes", [Object, Object])
], NoteService);
exports.NoteService = NoteService;
//# sourceMappingURL=note.service.js.map