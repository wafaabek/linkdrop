import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { query } from '../db/index.js'

export const register = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const hash = await bcrypt.hash(password, 10)
    const result = await query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hash]
    )
    const user = result.rows[0]
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ token, user })
  } catch (e) {
    res.status(400).json({ error: 'Username or email already taken' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } })
  } catch (e) {
    res.status(500).json({ error: 'Server error' })
  }
}