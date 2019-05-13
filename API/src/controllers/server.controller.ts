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
  requestBody,
} from '@loopback/rest';
import {Server} from '../models';
import {ServerRepository} from '../repositories';

export class ServerController {
  constructor(
    @repository(ServerRepository)
    public serverRepository : ServerRepository,
  ) {}

  @post('/servers', {
    responses: {
      '200': {
        description: 'Server model instance',
        content: {'application/json': {schema: {'x-ts-type': Server}}},
      },
    },
  })
  async create(@requestBody() server: Server): Promise<Server> {
    return await this.serverRepository.create(server);
  }

  @get('/servers/count', {
    responses: {
      '200': {
        description: 'Server model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Server)) where?: Where,
  ): Promise<Count> {
    return await this.serverRepository.count(where);
  }

  @get('/servers', {
    responses: {
      '200': {
        description: 'Array of Server model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Server}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Server)) filter?: Filter,
  ): Promise<Server[]> {
    return await this.serverRepository.find(filter);
  }

  @patch('/servers', {
    responses: {
      '200': {
        description: 'Server PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() server: Server,
    @param.query.object('where', getWhereSchemaFor(Server)) where?: Where,
  ): Promise<Count> {
    return await this.serverRepository.updateAll(server, where);
  }

  @get('/servers/{id}', {
    responses: {
      '200': {
        description: 'Server model instance',
        content: {'application/json': {schema: {'x-ts-type': Server}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Server> {
    return await this.serverRepository.findById(id);
  }

  @patch('/servers/{id}', {
    responses: {
      '204': {
        description: 'Server PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() server: Server,
  ): Promise<void> {
    await this.serverRepository.updateById(id, server);
  }

  @put('/servers/{id}', {
    responses: {
      '204': {
        description: 'Server PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() server: Server,
  ): Promise<void> {
    await this.serverRepository.replaceById(id, server);
  }

  @del('/servers/{id}', {
    responses: {
      '204': {
        description: 'Server DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.serverRepository.deleteById(id);
  }
}
