"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteProviders = void 0;
const note_entity_1 = require("./note.entity");
exports.noteProviders = [{ provide: "NOTE_REPOSITORY", useValue: note_entity_1.Note }];
//# sourceMappingURL=note.providers.js.map