import {Global, Module, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {
  DataSource,
  EntityManager,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from "typeorm";

import {v4} from "uuid";
import {Task} from "src/task/task.entity";

interface WriteConnection {
  readonly startTransaction: (
    level?:
      | "READ UNCOMMITTED"
      | "READ COMMITTED"
      | "REPEATABLE READ"
      | "SERIALIZABLE"
  ) => Promise<void>;
  readonly commitTransaction: () => Promise<void>;
  readonly rollbackTransaction: () => Promise<void>;
  readonly isTransactionActive: boolean;
  readonly manager: EntityManager;
}

interface ReadConnection {
  readonly getRepository: <T extends ObjectLiteral>(
    target: EntityTarget<T>
  ) => Repository<T>;
  readonly query: (query: string) => Promise<void>;
  readonly createQueryBuilder: <Entity extends ObjectLiteral>(
    entityClass: EntityTarget<Entity>,
    alias: string,
    queryRunner?: QueryRunner
  ) => SelectQueryBuilder<Entity>;
}

export let writeConnection = {} as WriteConnection;
export let readConnection = {} as ReadConnection;

class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly dataSource = new DataSource({
    type: "postgres",
    entities: [Task],
    host: "localhost",
    port: 5432,
    database: "postgres",
    username: "postgres",
    password: "root",
    synchronize: true,
  });

  async onModuleInit(): Promise<void> {
    await this.dataSource.initialize();
    if (!this.dataSource.isInitialized)
      throw new Error("DataSource is not initialized");
    writeConnection = this.dataSource.createQueryRunner();
    readConnection = this.dataSource.manager;
  }

  async onModuleDestroy(): Promise<void> {
    await this.dataSource.destroy();
  }
}

export class EntityId extends String {
  constructor() {
    super(v4().split("-").join(""));
  }
}

export const ENTITY_ID_TRANSFORMER = "EntityIdTransformer";

export interface EntityIdTransformer {
  from: (dbData: Buffer) => string;
  to: (stringId: string) => Buffer;
}

class EntityIdTransformerImplement implements EntityIdTransformer {
  from(dbData: Buffer): string {
    return Buffer.from(dbData.toString("binary"), "ascii").toString("hex");
  }

  to(entityData: string): Buffer {
    return Buffer.from(entityData, "hex");
  }
}

@Global()
@Module({
  providers: [
    DatabaseService,
    {
      provide: ENTITY_ID_TRANSFORMER,
      useClass: EntityIdTransformerImplement,
    },
  ],
  exports: [ENTITY_ID_TRANSFORMER],
})
export class DatabaseModule {}
