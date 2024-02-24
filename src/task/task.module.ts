import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TaskController} from "./task.controller";
import {TaskHandlerById} from "./cqrs/handler/queries/task-by-id.handler";
import {CreateTaskHandler} from "./cqrs/handler/command/create.handler";
import {UpdateTaskHandler} from "./cqrs/handler/command/update.handler";
import {DeleteTaskHandler} from "./cqrs/handler/command/delete.handler";
import {ListTaskHandler} from "./cqrs/handler/queries/task-list.handler";
import {CqrsModule} from "@nestjs/cqrs";

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [
    TaskHandlerById,
    CreateTaskHandler,
    UpdateTaskHandler,
    DeleteTaskHandler,
    ListTaskHandler,
  ],
})
export class TaskModule {}
