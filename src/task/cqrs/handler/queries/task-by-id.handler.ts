import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "src/task/task.entity";
import {Repository} from "typeorm";
import {TaskQueryById} from "../../queries/read.query";

@QueryHandler(TaskQueryById)
export class TaskHandlerById implements IQueryHandler<TaskQueryById> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}
  async execute(query: TaskQueryById): Promise<Task> {
    const {id} = query;
    return await this.taskRepository.findOneBy({id});
  }
}
