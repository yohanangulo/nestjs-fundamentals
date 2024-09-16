import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { v4 as uuid } from 'uuid';

@Module({
  imports: [ConfigModule],
  controllers: [EpisodesController],
  providers: [EpisodesService, { provide: 'uuid', useValue: uuid }],
})
export class EpisodesModule {}
