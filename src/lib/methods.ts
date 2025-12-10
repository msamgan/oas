export const getApiUrl = (path: string): string => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE
    const apiVersion = import.meta.env.VITE_API_VERSION || 'v1'

    return `${apiBaseUrl}/api/${apiVersion}/${path}`
}
