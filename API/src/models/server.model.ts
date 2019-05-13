import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Server extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  oldPrefix?: string;

  @property({
    type: 'string',
    required: true,
  })
  prefix: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  roles: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  discordChannels: string[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  twitchChannels?: object[];


  constructor(data?: Partial<Server>) {
    super(data);
  }
}
