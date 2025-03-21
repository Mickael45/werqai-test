import { IsOptional, IsString, MaxLength, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(Status)
    status?: Status;
}
