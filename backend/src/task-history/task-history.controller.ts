import { Controller, Get, Query } from '@nestjs/common';
import { TaskHistoryService } from './task-history.service';

@Controller('task-history')
export class TaskHistoryController {
  constructor(private readonly taskHistoryService: TaskHistoryService) {}

  @Get()
  findAll(@Query('taskId') taskId: string) {
    return this.taskHistoryService.findAll(taskId);
  }
}
