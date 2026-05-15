import express, { type Router } from 'express';
import { getItems, createItem, updateItem, deleteItem, getItemWithOrders, getItemsWithOrders } from '../controllers/item.controller.js';

const router: Router = express.Router();

router.get('/', getItems);
router.get('/with-orders', getItemsWithOrders);
router.get('/:id/orders', getItemWithOrders);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
