import { withIronSession } from 'next-iron-session'

export default function withSession (handler) {
  return withIronSession(handler, {
    password: process.env.COOKIE_SECRET,
    cookieName: process.env.COOKIE_NAME,
    ttl: 540,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  })
}
