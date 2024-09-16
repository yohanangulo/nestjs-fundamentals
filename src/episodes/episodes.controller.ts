import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ConfigService } from './../config/config.service';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/createEpisode.dto';
import { IsPositivePipe } from 'src/pipes/is-positive.pipe';
import { ApiKeyGuard } from './guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  async findAll(
    @Query('sort')
    sort: 'asc' | 'desc' = 'asc',

    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number,
  ) {
    return this.episodesService.findAll(sort, limit);
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    return this.episodesService.findOne(id);
  }

  @Get('featured')
  async findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Post()
  async create(
    @Body()
    episode: CreateEpisodeDto,
  ) {
    return this.episodesService.create(episode);
  }
}
