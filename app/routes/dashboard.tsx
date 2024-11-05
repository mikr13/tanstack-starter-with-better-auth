import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import React from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async ({ context }) => {
    const isAuthenticated = context.auth.isAuthenticated
    if (!isAuthenticated) {
      throw redirect({
        to: '/auth/login',
      })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1">
          <div className="container relative">
            <SidebarTrigger />
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
