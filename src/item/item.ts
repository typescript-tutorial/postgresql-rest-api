import { Attributes, Filter, Repository, Service } from 'onecore';

export interface Item {
    id: string;
    title?: string;
    description?: string;
}

export interface ItemFilter extends Filter {
    id: string;
    title?: string;
    description?: string;
}
export interface ItemRepository extends Repository<Item, string> {
}
export interface ItemService extends Service<Item, string, ItemFilter> {
}

export const itemModel: Attributes = {
    id: {
      key: true,
      match: 'equal'
    },
    title: {},
    description: {}
};