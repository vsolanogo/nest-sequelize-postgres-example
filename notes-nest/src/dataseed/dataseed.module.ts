import { Module } from "@nestjs/common";
import { DataSeedService } from "./dataseed.service";
import { noteProviders } from "../note/note.providers";
import { categoryProviders } from "../category/category.providers";

@Module({
  providers: [...categoryProviders, ...noteProviders, DataSeedService],
})
export class DataSeedModule {}
