import { auth } from '@/services/auth'
import { createAPIFileRoute } from '@tanstack/start/api'

export const Route = createAPIFileRoute('/api/auth/$')({
    GET: ({ request }) => {
        return auth.handler(request)
    },
    POST: ({ request }) => {
        return auth.handler(request)
    },
})
