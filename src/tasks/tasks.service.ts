import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Tasks } from './schemas/tasks.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name)
    private TasksModel: mongoose.Model<Tasks>,
  ) {}

  async findAll(query: Query): Promise<Tasks[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const Task = await this.TasksModel.find({ ...keyword });

    return Task;
  }

  async create(Tasks: Tasks, user: User): Promise<Tasks> {
    const data = Object.assign(Tasks, { user: user._id });

    const res = await this.TasksModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Tasks> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const Tasks = await this.TasksModel.findById(id);

    if (!Tasks) {
      throw new NotFoundException('Tasks not found.');
    }

    return Tasks;
  }

  async updateById(id: string, Tasks: Tasks): Promise<Tasks> {
    return await this.TasksModel.findByIdAndUpdate(id, Tasks, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Tasks> {
    return await this.TasksModel.findByIdAndDelete(id);
  }
}
