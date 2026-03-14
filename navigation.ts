import type {Product} from './types';

export type ScreenState =
  | {type: 'catalog'}
  | {type: 'details'; productId: string}
  | {type: 'cart'};

export default ScreenState;
