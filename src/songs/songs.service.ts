import { Injectable } from '@nestjs/common';

import { CreateSongDTO } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  private readonly songs: CreateSongDTO[] = [
    {
      artists: ['test'],
      duration: new Date(),
      releaseDate: new Date(),
      title: 'test',
    },
  ];

  create(createSongDTO: CreateSongDTO) {
    this.songs.push(createSongDTO);

    return createSongDTO;
  }

  findAll() {
    return this.songs;
  }
}
