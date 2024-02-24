import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateTaskCommand} from "../../commands/create.command";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "src/task/task.entity";

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}
  async execute(command: UpdateTaskCommand): Promise<void> {
    const {id, completed} = command;
    await this.taskRepository.update(id, {completed});
  }
}
