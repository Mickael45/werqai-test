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
  }) {
    const { page, limit, sortBy, order, statusFilter } = params;
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where: {
          deletedAt: null,
          status: statusFilter === 'ALL' ? undefined : statusFilter,
        },
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.task.count({
        where: {
          deletedAt: null,
          status: statusFilter === 'ALL' ? undefined : statusFilter,
        },
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
