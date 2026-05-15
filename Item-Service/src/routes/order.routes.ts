import express, { type Router } from 'express';
import { createOrder, getOrders, getOrderById } from '../controllers/order.controller.js';

const router: Router = express.Router();

router.get('/', getOrders);
router.post('/', createOrder);
router.get('/:id', getOrderById);

export default router;
