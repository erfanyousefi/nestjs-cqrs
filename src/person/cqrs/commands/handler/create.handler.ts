import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreatePersonCommand} from "../implements/create.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "src/person/entities/person.entity";
import {Repository} from "typeorm";

@CommandHandler(CreatePersonCommand)
export class CreatePersonHandler
  implements ICommandHandler<CreatePersonCommand>
{
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>
  ) {}

  async execute(command: CreatePersonCommand): Promise<any> {
    const {age, name} = command;
    await this.personRepository.insert({name, age});
  }
}
