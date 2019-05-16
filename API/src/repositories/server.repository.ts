import { DefaultCrudRepository } from '@loopback/repository';
import { Server } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ServerRepository extends DefaultCrudRepository<
  Server,
  typeof Server.prototype.id
  > {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Server, dataSource);
  }
  public findStreamersByServerId(id: number) {
    let self = this;
    return new Promise<any>(async (resolve, reject) => {
      let server = await self.findById(id);
      let streamers = server.twitchChannels;
      resolve(streamers);
    });
  }
}
