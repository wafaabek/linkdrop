import { Router } from 'express'
import { getLinks, createLink, deleteLink, trackClick, getPublicProfile } from '../controllers/links.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()
router.get('/profile/:username', getPublicProfile)
router.get('/', authMiddleware, getLinks)
router.post('/', authMiddleware, createLink)
router.delete('/:id', authMiddleware, deleteLink)
router.post('/:id/click', trackClick)

export default router