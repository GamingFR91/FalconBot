// Uncomment these imports to begin using these cool features!
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody
} from '@loopback/rest';

import { Server } from '../models';
import { ServerRepository } from '../repositories';
export class StreamerController {
  constructor(
    @repository(ServerRepository)
    public serverRepository: ServerRepository,
  ) { }
  @get('/streamers/{id}', {
    responses: {
      '200': {
        description: 'get streamers by Server id',
        content: { 'application/json': {} },
      },
    },
  })
  async getAllStreamers(@param.path.number('id') id: number) {
    return await this.serverRepository.findStreamersByServerId(id);
  }
}
