import { ApiProperty } from "@nestjs/swagger";

export class CreateEscortDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    face_photo: string
    
    @ApiProperty()
    primary_body_photo: string
    
    @ApiProperty()
    secondary_body_photo: string

    @ApiProperty()
    status: number
}