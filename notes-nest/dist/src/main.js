"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const dataseed_service_1 = require("./dataseed/dataseed.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (process.env.SEED_ENV) {
        const dataSeedService = app.get(dataseed_service_1.DataSeedService);
        await dataSeedService.seedDatabase();
        process.exit(0);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map