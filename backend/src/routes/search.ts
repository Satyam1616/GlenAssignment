import express from 'express';
import { searchListings } from '../controllers/searchController';

const router = express.Router();

router.get('/listings', searchListings);

export default router; 