// Define the session storage interface
interface SessionStorage {
  getSession: (cookieHeader?: string | null) => Promise<Session>
  commitSession: (session: Session) => Promise<string>
  destroySession: (session: Session) => Promise<string>
}

interface Session {
  get: (key: string) => unknown
  set: (key: string, value: unknown) => void
  unset: (key: string) => void
  toJSON: () => Record<string, unknown>
}

// Create a simple cookie-based session implementation
class CookieSession implements Session {
  private data: Map<string, unknown>

  constructor(initialData: Record<string, unknown> = {}) {
    this.data = new Map(Object.entries(initialData))
  }

  get(key: string) {
    return this.data.get(key)
  }

  set(key: string, value: unknown) {
    this.data.set(key, value)
  }

  unset(key: string) {
    this.data.delete(key)
  }

  toJSON() {
    return Object.fromEntries(this.data)
  }
}

const createSessionStorage = (): SessionStorage => {
  return {
    async getSession(cookieHeader?: string | null) {
      let data = {}
      if (cookieHeader) {
        try {
          data = JSON.parse(atob(cookieHeader.split('=')[1]))
        } catch (e) {
          // Invalid cookie, create new session
        }
      }
      return new CookieSession(data)
    },

    async commitSession(session: Session) {
      const sessionData = btoa(JSON.stringify(session.toJSON()))
      return `__session=${sessionData}; Path=/; HttpOnly; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`
    },

    async destroySession() {
      return `__session=; Path=/; HttpOnly; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }; Max-Age=0`
    },
  }
}

const sessionStorage = createSessionStorage()

export async function getUser(request: Request) {
  const cookieHeader = request.headers.get('Cookie')
  const session = await sessionStorage.getSession(cookieHeader)
  const userId = session.get('userId')
  
  if (!userId) return null
  
  // Add your user fetching logic here
  // return await db.user.findUnique({ where: { id: userId }})
  return { id: userId }
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession()
  session.set('userId', userId)
  
  return {
    redirect: redirectTo,
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  }
}

export async function logout() {
  const session = await sessionStorage.getSession()
  
  return {
    redirect: '/login',
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  }
}

// Helper to get session from request
export async function getSession(request: Request) {
  const cookieHeader = request.headers.get('Cookie')
  return sessionStorage.getSession(cookieHeader)
} 