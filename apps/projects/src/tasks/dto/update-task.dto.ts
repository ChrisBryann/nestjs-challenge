import { IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}