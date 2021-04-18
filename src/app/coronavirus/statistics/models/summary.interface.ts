import { Countries } from './countries.interface';
import { Global } from './global.interface';

export interface Summary {
  Global: Global;
  Countries: Countries[];
  Date: string;
}
