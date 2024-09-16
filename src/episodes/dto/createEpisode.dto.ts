import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsBoolean()
  featured?: boolean;
}
