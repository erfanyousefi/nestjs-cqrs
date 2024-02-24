// ./task/entities/task.entity
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  description: string;
  @Column({default: false})
  completed: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
