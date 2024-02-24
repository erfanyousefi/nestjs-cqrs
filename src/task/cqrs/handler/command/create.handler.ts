import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateTaskCommand} from "../../commands/create.command";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "src/task/task.entity";
import {Transactional} from "src/decorators/Transactional";

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}
  async execute(command: CreateTaskCommand): Promise<void> {
    const {description} = command;
    await this.taskRepository.save({description});
  }
}
