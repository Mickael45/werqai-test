import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskHistoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(taskId: string) {
    const [taskHistoryItems] = await Promise.all([
      this.prisma.taskHistory.findMany({
        where: {
          taskId,
        },
      }),
    ]);

    return { taskHistoryItems };
  }
}
