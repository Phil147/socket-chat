import { ServerCommand } from './../server-model';
export interface Widget {
  complete?(...props: any[]): void;
  setData(command: ServerCommand): void;
}