import { Outlet } from '@tanstack/react-router'

export function rootComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
} 