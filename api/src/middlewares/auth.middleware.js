import jwt from 'jsonwebtoken'

export const auth = (roles = []) => (req, res, next) => {
  const authorization = req.headers.authorization

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' })
  }

  const token = authorization.split(' ')[1]

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }

  if (roles.length && !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  next()
}
