import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from "@nestjs/common";
import {CreateTaskDto, UpdateTaskDto} from "./dto/task.dto";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateTaskHandler} from "./cqrs/handler/command/create.handler";
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from "./cqrs/commands/create.command";
import {ListTaskQuery, TaskQueryById} from "./cqrs/queries/read.query";

@Controller("task")
export class TaskController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  @Post("/")
  async create(@Body() {description}: CreateTaskDto) {
    this.commandBus.execute<CreateTaskCommand>(
      new CreateTaskCommand(description)
    );
    return "Created";
  }

  @Put("/:id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() {completed}: UpdateTaskDto
  ) {
    await this.commandBus.execute(new UpdateTaskCommand(id, completed));
    return "Updated";
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number) {
    await this.commandBus.execute(new DeleteTaskCommand(id));
    return "Deleted";
  }

  @Get("/")
  async find() {
    return this.queryBus.execute(new ListTaskQuery());
  }

  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number) {
    return await this.queryBus.execute(new TaskQueryById(id));
  }
}
