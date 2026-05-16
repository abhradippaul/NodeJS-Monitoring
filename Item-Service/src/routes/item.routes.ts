import express, { type Router } from 'express';
import { getItems, createItem, updateItem, deleteItem } from '../controllers/item.controller.js';

const router: Router = express.Router();

router.get('/', getItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
