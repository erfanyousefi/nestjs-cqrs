import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {ListTaskQuery} from "../../queries/read.query";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "src/task/task.entity";
import {Repository} from "typeorm";

@QueryHandler(ListTaskQuery)
export class ListTaskHandler implements IQueryHandler<ListTaskQuery> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.findBy({});
  }
}
