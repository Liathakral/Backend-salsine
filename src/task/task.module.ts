import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { taskController } from './task.controller';
import { taskService } from './task.service';
import { taskSchema } from './schemas/task.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'task', schema: taskSchema }]),
  ],
  controllers: [taskController],
  providers: [taskService],
})
export class taskModule {}
