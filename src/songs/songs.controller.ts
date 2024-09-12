import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }

  @Get(':id')
  findOne(): string {
    return 'song with id';
  }

  @Put(':id')
  update(): string {
    return 'update song with id';
  }

  @Delete(':id')
  remove(): string {
    return 'remove song with id';
  }
}
