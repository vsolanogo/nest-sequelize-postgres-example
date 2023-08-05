import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DataSeedService } from "./dataseed/dataseed.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.SEED_ENV) {
    const dataSeedService = app.get(DataSeedService);
    await dataSeedService.seedDatabase();

    process.exit(0);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
