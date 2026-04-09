import { query } from '../db/index.js'

export const getLinks = async (req, res) => {
  const result = await query('SELECT * FROM links WHERE user_id = $1 ORDER BY position', [req.user.id])
  res.json(result.rows)
}

export const createLink = async (req, res) => {
  const { title, url } = req.body
  const count = await query('SELECT COUNT(*) FROM links WHERE user_id = $1', [req.user.id])
  const position = parseInt(count.rows[0].count)
  const result = await query(
    'INSERT INTO links (user_id, title, url, position) VALUES ($1, $2, $3, $4) RETURNING *',
    [req.user.id, title, url, position]
  )
  res.status(201).json(result.rows[0])
}

export const deleteLink = async (req, res) => {
  await query('DELETE FROM links WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id])
  res.json({ success: true })
}

export const trackClick = async (req, res) => {
  const result = await query(
    'UPDATE links SET clicks = clicks + 1 WHERE id = $1 RETURNING url',
    [req.params.id]
  )
  res.json({ url: result.rows[0]?.url })
}

export const getPublicProfile = async (req, res) => {
  const user = await query('SELECT id, username, theme FROM users WHERE username = $1', [req.params.username])
  if (!user.rows[0]) return res.status(404).json({ error: 'User not found' })
  const links = await query('SELECT id, title, url, clicks FROM links WHERE user_id = $1 ORDER BY position', [user.rows[0].id])
  res.json({ user: user.rows[0], links: links.rows })
}