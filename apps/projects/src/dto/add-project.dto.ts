import { IsString } from "class-validator";

export class AddProjectDto {
    @IsString()
    name: string;

    @IsString()
    description: string;
}