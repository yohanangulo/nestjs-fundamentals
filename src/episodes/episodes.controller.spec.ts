import { Test, TestingModule } from '@nestjs/testing';

import { EpisodesController } from './episodes.controller';
import { ConfigModule } from './../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();
  const mockEpisodesService = {
    findAll: async () => [{ id: 'id' }],
    findFeaturedEpisodes: async () => [{ id: 'id' }],
    findOne: mockFindOne,
    create: async () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    describe('when episode is found', () => {
      const episodeId = 'id';
      const mockResult = { id: episodeId, name: 'episode name' };

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });

      it('should call episodesService.findOne', async () => {
        await controller.findOne(episodeId);
        expect(mockEpisodesService.findOne).toHaveBeenCalledWith(episodeId);
      });

      it('should return an episode', async () => {
        const episode = await controller.findOne(episodeId);
        expect(episode).toEqual(mockResult);
      });
    });

    // describe('when episode is not found', () => {
    //   const episodeId = 'id';

    //   beforeEach(() => {
    //     mockFindOne.mockResolvedValue(null);
    //   });
    // });
  });
});
