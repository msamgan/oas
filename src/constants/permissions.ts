export const PERMISSIONS = {
    CONTACT_MESSAGES_VIEW: 'contact-messages.view',
} as const

export type PermissionKey = keyof typeof PERMISSIONS
export type PermissionValue = (typeof PERMISSIONS)[PermissionKey]
