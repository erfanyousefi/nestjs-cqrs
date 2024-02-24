import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PersonController} from "./person.controller";
import {GetPersonHandler} from "./cqrs/queries/handler/get-person.handler";
import {Person} from "./entities/person.entity";
import {CreatePersonHandler} from "./cqrs/commands/handler/create.handler";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Person])],
  providers: [GetPersonHandler, CreatePersonHandler],
  controllers: [PersonController],
})
export class PersonModule {}
