import { IsNotEmpty, IsString } from "class-validator";

export class AddProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}