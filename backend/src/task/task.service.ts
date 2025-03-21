import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll(params: {
    page: number;
    limit: number;
    sortBy: string;
    order: 'asc' | 'desc';
    statusFilter: Status | 'ALL';
    searchTerm: string;
  }) {
    const { page, limit, sortBy, order, statusFilter, searchTerm } = params;
    const skip = (page - 1) * limit;
    const where = {
      deletedAt: null,
      status: statusFilter === 'ALL' ? undefined : statusFilter,
      OR: [
        { title: { contains: searchTerm } },
        { description: { contains: searchTerm } },
      ],
    };

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.task.count({
        where,
      }),
    ]);

    return {
      tasks,
      pages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const currentTask = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!currentTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (updateTaskDto.status && updateTaskDto.status !== currentTask.status) {
      await this.prisma.taskHistory.create({
        data: {
          taskId: id,
          previousStatus: currentTask.status,
          reason: `Changed from ${currentTask.status} to ${updateTaskDto.status}`,
          newStatus: updateTaskDto.status as Status,
        },
      });
    }

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: string) {
    return this.prisma.task.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
