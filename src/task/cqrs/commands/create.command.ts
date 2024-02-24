import {ICommand} from "@nestjs/cqrs";

export class CreateTaskCommand {
  constructor(public readonly description: string) {}
}

export class DeleteTaskCommand implements ICommand {
  constructor(public readonly id: number) {
    this.id = id;
  }
}
export class UpdateTaskCommand implements ICommand {
  constructor(
    public id: number,
    public completed: boolean
  ) {
    this.id = id;
    this.completed = completed;
  }
}
