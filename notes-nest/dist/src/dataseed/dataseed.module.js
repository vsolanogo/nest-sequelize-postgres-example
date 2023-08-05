"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSeedModule = void 0;
const common_1 = require("@nestjs/common");
const dataseed_service_1 = require("./dataseed.service");
const note_providers_1 = require("../note/note.providers");
const category_providers_1 = require("../category/category.providers");
let DataSeedModule = class DataSeedModule {
};
DataSeedModule = __decorate([
    (0, common_1.Module)({
        providers: [...category_providers_1.categoryProviders, ...note_providers_1.noteProviders, dataseed_service_1.DataSeedService],
    })
], DataSeedModule);
exports.DataSeedModule = DataSeedModule;
//# sourceMappingURL=dataseed.module.js.map