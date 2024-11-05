import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      {/* Add dashboard content */}
    </div>
  )
}
