"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const db_module_1 = require("./db/db.module");
const note_module_1 = require("./note/note.module");
const category_module_1 = require("./category/category.module");
const dataseed_module_1 = require("./dataseed/dataseed.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: !!process.env.NODE_ENV,
                envFilePath: `.env.${process.env.NODE_ENV}`,
            }),
            db_module_1.DbModule,
            note_module_1.NoteModule,
            category_module_1.CategoryModule,
            dataseed_module_1.DataSeedModule,
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map