import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { TaskHistoryModule } from './task-history/task-history.module';

@Module({
  imports: [PrismaModule, TaskModule, TaskHistoryModule],
})
export class AppModule {}
