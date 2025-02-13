import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Task } from './task.entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.taskRepo.find();
  }

  async findOne(id: number): Promise<Task | null> {
    return await this.taskRepo.findOne({ where: { id } });
  }

  async create(task: Task): Promise<Task> {
    return await this.taskRepo.save(task);
  }

  async update(task: Task): Promise<UpdateResult> {
    return await this.taskRepo.update(task.id, task);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.taskRepo.delete(id);
  }
}
