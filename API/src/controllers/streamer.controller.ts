// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import {get} from '@loopback/rest';
export class StreamerController {
  @get('/streamer')
  streamer(): string {
    return 'Hello world!';
  }
}
