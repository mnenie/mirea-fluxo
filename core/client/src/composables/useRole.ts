type Role = keyof typeof roles
export type Permission = (typeof roles)[Role][number]

const roles = {
  manager: [
    'view:orders',
    'view:order',
    'update:order',
    'view:analytics',
    'view:stages',
    'view:risks',
    'create:risks',
    'view:archive',
    'view:notifications',
    'delete:stages',
    'create:stages',
    'create:contract',
  ],
  corporation: [
    'view:orders',
    'view:order',
    'view:stages',
    'create:stages',
    'view:risks',
    'create:risks',
    'view:archive',
    'view:notifications',
    'delete:stages',
  ],
} as const

const _roles: Record<Role, readonly Permission[]> = roles

export function useRole() {
  const hasPermission = (role: Role, permission: Permission): boolean => {
    if (!_roles[role])
      return false
    return _roles[role].includes(permission)
  }

  return {
    hasPermission,
  }
}
