import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CreateTasksDto } from './dto/create-tasks.dto';
import { UpdateTasksDto } from './dto/update-tasks.dto';
import { Tasks } from './schemas/tasks.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';

@Controller('Tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getAllTaskss(@Query() query: ExpressQuery): Promise<Tasks[]> {
    return this.taskService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createTasks(
    @Body()
    Tasks: CreateTasksDto,
    @Req() req,
  ): Promise<Tasks> {
    return this.taskService.create(Tasks, req.user);
  }

  @Get(':id')
  async getTasks(
    @Param('id')
    id: string,
  ): Promise<Tasks> {
    return this.taskService.findById(id);
  }

  @Put(':id')
  async updateTasks(
    @Param('id')
    id: string,
    @Body()
    Tasks: UpdateTasksDto,
  ): Promise<Tasks> {
    return this.taskService.updateById(id, Tasks);
  }

  @Delete(':id')
  async deleteTasks(
    @Param('id')
    id: string,
  ): Promise<Tasks> {
    return this.taskService.deleteById(id);
  }
}
