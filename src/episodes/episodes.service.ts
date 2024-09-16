import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Episode } from './entities/episode.entity';
import { CreateEpisodeDto } from './dto/createEpisode.dto';
import { type v4 } from 'uuid';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  constructor(@Inject('uuid') private uuid: typeof v4) {
    this.episodes.push({ id: this.uuid(), name: 'episode 1', featured: true });
  }

  async findAll(sort: 'asc' | 'desc', limit: number) {
    console.log(limit);

    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  async findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  async findOne(id: string) {
    const episode = this.episodes.find((episode) => episode.id === id);

    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return episode;
  }

  async create(episode: CreateEpisodeDto) {
    this.episodes.push({ ...episode, id: this.uuid() });

    return episode;
  }
}
