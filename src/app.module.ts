import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./task/task.entity";
import {TaskModule} from "./task/task.module";
import {CqrsModule} from "@nestjs/cqrs";
import {PersonModule} from "./person/person.module";
import {Person} from "./person/entities/person.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      database: "postgres",
      password: "root",
      host: "localhost",
      autoLoadEntities: true,
      entities: [Task, Person],
      synchronize: true,
    }),
    CqrsModule,
    TaskModule,
    PersonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
