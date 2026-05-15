import type { Request, Response } from 'express';
import Order from '../models/order.model.js';
import Item from '../models/item.model.js';
import logger from '../logger/index.js';
import { orderSchema } from '../schemas/order.schema.js';
import { ZodError } from 'zod';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const validatedData = orderSchema.parse(req.body);
    
    // Calculate total price and verify items exist
    let totalPrice = 0;
    for (const itemData of validatedData.items) {
      const item = await Item.findById(itemData.item);
      if (!item) {
        logger.warn(`Item not found for order: ${itemData.item}`);
        return res.status(404).json({
          message: "Item not found",
          error: `Item with id ${itemData.item} not found`
        });
      }
      totalPrice += item.price * itemData.quantity;
    }

    const newOrder = new Order({
      ...validatedData,
      totalPrice
    });

    await newOrder.save();
    logger.info(`Created new order: ${newOrder._id}`);
    res.status(201).json({
      message: "Successfully created order",
      data: newOrder
    });
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(`Validation error creating order: ${JSON.stringify(error.issues)}`);
      return res.status(400).json({
        message: "Validation Error",
        error: error.issues
      });
    }
    logger.error(`Error creating order: ${error}`);
    res.status(500).json({
      message: "Failed to create order",
      error: error
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('items.item');
    logger.info('Fetched all orders');
    res.status(200).json({
      message: "Successfully fetched all orders",
      data: orders
    });
  } catch (error) {
    logger.error(`Error fetching orders: ${error}`);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('items.item');
    if (!order) {
      logger.warn(`Order not found: ${id}`);
      return res.status(404).json({
        message: "Order not found",
        data: null
      });
    }
    logger.info(`Fetched order: ${id}`);
    res.status(200).json({
      message: "Successfully fetched order",
      data: order
    });
  } catch (error) {
    logger.error(`Error fetching order ${req.params.id}: ${error}`);
    res.status(500).json({
      message: "Failed to fetch order",
      error: error
    });
  }
};
