 
import express from 'express';
import { PcRoutes } from '../modules/pc/pc.route';
const router = express.Router();

const moduleRoutes = [
    {
         path: '/pcparts',
         route: PcRoutes,
    }, 
]
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;