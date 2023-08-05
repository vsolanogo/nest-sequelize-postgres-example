"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_entity_1 = require("./../category/category.entity");
const note_entity_1 = require("./../note/note.entity");
const config_1 = require("@nestjs/config");
exports.databaseProviders = [
    {
        provide: "SEQUELIZE",
        useFactory: async (config) => {
            const kek = {
                dialect: "postgres",
                host: config.get("DB_HOST") || "db",
                port: +config.get("DB_PORT") || 5432,
                username: "vitalii",
                password: "vitalii",
                database: config.get("DB_NAME") || "example",
                logging: false,
            };
            console.log({ kek });
            const sequelize = new sequelize_typescript_1.Sequelize(kek);
            sequelize.addModels([category_entity_1.Category, note_entity_1.Note]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=db.js.map