import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/dashboard/users')({
  component: UsersPage,
})

function UsersPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold">Users</h1>
      {/* Add users management content */}
    </div>
  )
}
