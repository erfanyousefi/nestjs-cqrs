import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteTaskCommand} from "../../commands/create.command";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "src/task/task.entity";

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
  ) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    const {id} = command;
    await this.taskRepository.delete({id});
  }
}
