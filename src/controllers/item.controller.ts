import type { Request, Response } from 'express';
import Item from '../models/item.model.js';
import logger from '../utils/logger.js';
import { itemSchema } from '../schemas/item.schema.js';
import { ZodError } from 'zod';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    logger.info('Fetched all items');
    res.status(200).json(items);
  } catch (error) {
    logger.error(`Error fetching items: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const validatedData = itemSchema.parse(req.body);
    const newItem = new Item(validatedData);
    await newItem.save();
    logger.info(`Created new item: ${validatedData.name}`);
    res.status(201).json(newItem);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(`Validation error creating item: ${JSON.stringify(error.issues)}`);
      return res.status(400).json({ error: 'Validation Error', details: error.issues });
    }
    logger.error(`Error creating item: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = itemSchema.parse(req.body);
    
    const updatedItem = await Item.findByIdAndUpdate(id, validatedData, { returnDocument: 'after' });
    if (!updatedItem) {
      logger.warn(`Item not found for update: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    logger.info(`Updated item: ${id}`);
    res.status(200).json(updatedItem);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(`Validation error updating item ${req.params.id}: ${JSON.stringify(error.issues)}`);
      return res.status(400).json({ error: 'Validation Error', details: error.issues });
    }
    logger.error(`Error updating item ${req.params.id}: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      logger.warn(`Item not found for deletion: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    logger.info(`Deleted item: ${id}`);
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    logger.error(`Error deleting item ${req.params.id}: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
