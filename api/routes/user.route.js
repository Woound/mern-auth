import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

// router.get('/', (req, res) => {
//     res.json({
//       message: 'API is working!',
//     });
//   });

// Best practice is to remove the function inside the router and
// put it in a separate controller file in a controllers folder.

router.get('/', test);

export default router;
