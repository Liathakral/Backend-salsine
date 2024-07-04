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

import { CreatetaskDto } from './dto/create-task.dto';
import { UpdatetaskDto } from './dto/update-task.dto';
import { task } from './schemas/task.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { taskService } from './task.service';

@Controller('tasks')
export class taskController {
  constructor(private tasksService: taskService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAlltasks(@Query() query: ExpressQuery, @Req() req): Promise<task[]> {
    return this.tasksService.findAll(query, req.user);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createtask(
    @Body()
    task: CreatetaskDto,
    @Req() req,
  ): Promise<task> {
    return this.tasksService.create(task, req.user);
  }

  @Get(':id')
  async gettask(
    @Param('id')
    id: string,
  ): Promise<task> {
    return this.tasksService.findById(id);
  }

  @Put(':id')
  async updatetask(
    @Param('id')
    id: string,
    @Body()
    task: UpdatetaskDto,
  ): Promise<task> {
    return this.tasksService.updateById(id, task);
  }

  @Delete(':id')
  async deletetask(
    @Param('id')
    id: string,
  ): Promise<task> {
    return this.tasksService.deleteById(id);
  }
}
