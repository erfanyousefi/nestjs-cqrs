import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetPersonQuery} from "../implements/get-person.query";
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "src/person/entities/person.entity";
import {Repository} from "typeorm";

@QueryHandler(GetPersonQuery)
export class GetPersonHandler implements IQueryHandler<GetPersonQuery> {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>
  ) {}
  async execute(query: GetPersonQuery): Promise<Person[]> {
    return await this.personRepository.find();
  }
}
