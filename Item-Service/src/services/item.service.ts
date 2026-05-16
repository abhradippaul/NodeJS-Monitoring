import Item from '../models/item.model.js';
import type { IItem } from '../models/item.model.js';
import type { ItemInput } from '../schemas/item.schema.js';

export class ItemService {
  async getAllItems(): Promise<IItem[]> {
    return await Item.find();
  }

  async createItem(data: ItemInput): Promise<IItem> {
    const newItem = new Item(data);
    return await newItem.save();
  }

  async updateItem(id: string, data: ItemInput): Promise<IItem | null> {
    return await Item.findByIdAndUpdate(id, data, { returnDocument: 'after' });
  }

  async deleteItem(id: string): Promise<IItem | null> {
    return await Item.findByIdAndDelete(id);
  }

  async getItemById(id: string): Promise<IItem | null> {
    return await Item.findById(id);
  }
}

export const itemService = new ItemService();
