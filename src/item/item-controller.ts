import { Controller, Log } from 'express-ext';
import { Item, ItemFilter, ItemService } from './item';

export class ItemController extends Controller<Item, string, ItemFilter> {
  constructor(log: Log, itemService: ItemService) {
    super(log, itemService);
  }
}