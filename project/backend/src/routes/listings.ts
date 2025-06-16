import express from 'express';
import { auth, isHost } from '../middleware/auth';
import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing
} from '../controllers/listingController';

const router = express.Router();

router.get('/', getListings);
router.get('/:id', getListing);
router.post('/', auth, isHost, createListing);
router.put('/:id', auth, isHost, updateListing);
router.delete('/:id', auth, isHost, deleteListing);

export default router; 