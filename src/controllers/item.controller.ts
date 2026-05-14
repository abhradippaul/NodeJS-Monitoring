import type { Request, Response } from 'express';
import Item from '../models/item.model.js';
import Order from '../models/order.model.js';
import logger from '../logger/index.js';
import { itemSchema } from '../schemas/item.schema.js';
import { ZodError } from 'zod';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find();
    logger.info('Fetched all items');
    res.status(200).json({
      message: "Successfully fetched all the items",
      data: items
    });
  } catch (error) {
    logger.error(`Error fetching items: ${error}`);
    res.status(500).json({
      message: "Failed to fetch all the items",
      error: error
    });
  }
};

export const getItemsWithOrders = async (req: Request, res: Response) => {
  try {
    const items = await Item.find().populate('orders');
    logger.info('Fetched all items with orders');
    res.status(200).json({
      message: "Successfully fetched all items with orders",
      data: items
    });
  } catch (error) {
    logger.error(`Error fetching items with orders: ${error}`);
    res.status(500).json({
      message: "Failed to fetch items with orders",
      error: error
    });
  }
};

export const getItemWithOrders = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        message: "Invalid Item ID",
        error: "ID is required and must be a string"
      });
    }

    const item = await Item.findById(id).populate('orders');
    if (!item) {
      logger.warn(`Item not found: ${id}`);
      return res.status(404).json({
        message: "Item not found",
        data: null
      });
    }

    logger.info(`Fetched item with orders: ${id}`);
    res.status(200).json({
      message: "Successfully fetched item with orders",
      data: item
    });
  } catch (error) {
    logger.error(`Error fetching item with orders ${req.params.id}: ${error}`);
    res.status(500).json({
      message: "Failed to fetch item with orders",
      error: error
    });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const validatedData = itemSchema.parse(req.body);
    const newItem = new Item(validatedData);
    await newItem.save();
    logger.info(`Created new item: ${validatedData.name}`);
    res.status(201).json({
      message: "Successfully created item",
      data: newItem
    });
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(`Validation error creating item: ${JSON.stringify(error.issues)}`);
      return res.status(400).json({
        message: "Validation Error",
        error: error.issues
      });
    }
    logger.error(`Error creating item: ${error}`);
    res.status(500).json({
      message: "Failed to create item",
      error: error
    });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = itemSchema.parse(req.body);

    const updatedItem = await Item.findByIdAndUpdate(id, validatedData, { returnDocument: 'after' });
    if (!updatedItem) {
      logger.warn(`Item not found for update: ${id}`);
      return res.status(404).json({
        message: "Item not found",
        data: null
      });
    }
    logger.info(`Updated item: ${id}`);
    res.status(200).json({
      message: "Successfully updated item",
      data: updatedItem
    });
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(`Validation error updating item ${req.params.id}: ${JSON.stringify(error.issues)}`);
      return res.status(400).json({
        message: "Validation Error",
        error: error.issues
      });
    }
    logger.error(`Error updating item ${req.params.id}: ${error}`);
    res.status(500).json({
      message: "Failed to update item",
      error: error
    });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      logger.warn(`Item not found for deletion: ${id}`);
      return res.status(404).json({
        message: "Item not found",
        data: null
      });
    }
    logger.info(`Deleted item: ${id}`);
    res.status(200).json({
      message: "Successfully deleted item",
      data: deletedItem
    });
  } catch (error) {
    logger.error(`Error deleting item ${req.params.id}: ${error}`);
    res.status(500).json({
      message: "Failed to delete item",
      error: error
    });
  }
};
