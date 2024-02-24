import {Body, Controller, Get, Post} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetPersonQuery} from "./cqrs/queries/implements/get-person.query";
import {CreatePersonCommand} from "./cqrs/commands/implements/create.command";
import {CreatePersonDto} from "./dto/create.dto";

@Controller("person")
export class PersonController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus
  ) {}

  @Get()
  find() {
    return this.queryBus.execute(new GetPersonQuery());
  }
  @Post()
  create(@Body() {age, name}: CreatePersonDto) {
    this.commandBus.execute(new CreatePersonCommand(name, age));
    return "Created";
  }
}
