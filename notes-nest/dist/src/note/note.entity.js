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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_entity_1 = require("../category/category.entity");
let Note = class Note extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Note.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Note.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Note.prototype, "deletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_entity_1.Category),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Note.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_entity_1.Category),
    __metadata("design:type", category_entity_1.Category)
], Note.prototype, "categoryData", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Note.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.JSON), allowNull: true }),
    __metadata("design:type", Array)
], Note.prototype, "dates", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Note.prototype, "isArchived", void 0);
Note = __decorate([
    sequelize_typescript_1.Table
], Note);
exports.Note = Note;
//# sourceMappingURL=note.entity.js.map