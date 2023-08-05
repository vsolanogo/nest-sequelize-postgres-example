import { Sequelize } from "sequelize-typescript";
import { Category } from "./../category/category.entity";
import { Note } from "./../note/note.entity";
import { ConfigService } from "@nestjs/config";
import { Dialect } from "sequelize/types";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async (config: ConfigService) => {
      const conf = {
        dialect: "postgres" as Dialect,
        host: config.get("DB_HOST") || "db",
        port: +config.get("DB_PORT") || 5432,
        username: "vitalii",
        password: "vitalii",
        database: config.get("DB_NAME") || "example",
        logging: false,
      };

      const sequelize = new Sequelize(conf);
      sequelize.addModels([Category, Note]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
