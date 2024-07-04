import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { task } from './schemas/task.schema';

import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class taskService {
  constructor(
    @InjectModel(task.name)
    private taskModel: mongoose.Model<task>,
  ) {}

  async findAll(query: Query, user: User): Promise<task[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const tasks = await this.taskModel.find({ ...keyword, user: user._id });
    console.log(user._id);
    return tasks;
  }
  async create(task: task, user: User): Promise<task> {
    const data = Object.assign(task, { user: user._id });

    const res = await this.taskModel.create(data);
    return res;
  }

  async findById(id: string): Promise<task> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException('task not found.');
    }

    return task;
  }

  async updateById(id: string, task: task): Promise<task> {
    return await this.taskModel.findByIdAndUpdate(id, task, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<task> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
