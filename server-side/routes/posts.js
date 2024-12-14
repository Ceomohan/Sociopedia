import express from 'express'

import {getFeedPosts,userPosts,likePost} from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

/* Read */

router.get('/', verifyToken, getFeedPosts)
router.get('./:userId/posts', verifyToken,userPosts)

/* update */

router.patch('/:id/like',verifyToken,likePost)


export default router
