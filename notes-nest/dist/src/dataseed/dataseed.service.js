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
exports.DataSeedService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const faker_1 = require("@faker-js/faker");
let DataSeedService = class DataSeedService {
    constructor(noteRepository, categoryRepository) {
        this.noteRepository = noteRepository;
        this.categoryRepository = categoryRepository;
    }
    async seedDatabase() {
        const categoriesList = [];
        for (let i = 0; i < 5; i++) {
            const res = await this.categoryRepository.create({
                name: (0, uuid_1.v4)(),
            });
            categoriesList.push(res);
        }
        const notesList = [];
        for (let i = 0; i < categoriesList.length; i++) {
            const notesBatchPromises = [];
            for (let j = 0; j < 5; j++) {
                const promise = this.noteRepository.create({
                    name: faker_1.faker.internet.displayName(),
                    category: categoriesList[i].id,
                    content: faker_1.faker.location.streetAddress(),
                    isArchived: Math.random() < 0.5,
                });
                notesBatchPromises.push(promise);
            }
            const batchResults = await Promise.all(notesBatchPromises);
            notesList.push(...batchResults);
        }
        console.log("Seed completed");
    }
};
DataSeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("NOTE_REPOSITORY")),
    __param(1, (0, common_1.Inject)("CATEGORY_REPOSITORY")),
    __metadata("design:paramtypes", [Object, Object])
], DataSeedService);
exports.DataSeedService = DataSeedService;
//# sourceMappingURL=dataseed.service.js.map