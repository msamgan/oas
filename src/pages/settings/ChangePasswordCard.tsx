import { useState } from 'react'
import Card from '../../components/ui/Card'
import Form from '../../components/ui/Form'
import Label from '../../components/ui/Label'
import Input from '../../components/ui/Input'
import Required from '../../components/ui/Required'
import FormSubmitButton from '../../components/ui/FormSubmitButton'
import Alert from '../../components/ui/Alert'
import { changePassword, type ChangePasswordResult } from '../../api/profile'

export default function ChangePasswordCard() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState<string | null>(null)

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('submitting')
        setMessage(null)

        const fd = new FormData(e.currentTarget)
        const current_password = (fd.get('current_password') || '').toString()
        const new_password = (fd.get('new_password') || '').toString()
        const confirm_password = (fd.get('confirm_password') || '').toString()

        if (!current_password || !new_password || !confirm_password) {
            setStatus('error')
            setMessage('Please fill in all required fields.')
            return
        }
        if (new_password.length < 8) {
            setStatus('error')
            setMessage('New password must be at least 8 characters long.')
            return
        }
        if (new_password !== confirm_password) {
            setStatus('error')
            setMessage('New password and confirmation do not match.')
            return
        }

        const res: ChangePasswordResult = await changePassword({ current_password, new_password })

        if (!res.ok) {
            setStatus('error')
            setMessage(res.message)
            return
        }

        setStatus('success')
        setMessage(res.message || 'Password updated successfully.')
        ;(e.currentTarget as HTMLFormElement).reset()
        setTimeout(() => setStatus('idle'), 2000)
    }

    return (
        <Card variant="default" className="overflow-hidden">
            <div className="mt-4 mb-6 ml-10 flex items-start gap-4">
                <div className="from-accent/10 to-accent-2/10 inline-flex items-center justify-center rounded-lg bg-linear-to-br p-2.5">
                    <svg className="text-accent h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-text mb-2 text-xl font-bold">Change Password</h2>
                    <p className="text-muted text-sm">Update your account password. Make sure it’s strong and unique.</p>
                </div>
            </div>

            <Form onSubmit={onSubmit}>
                {/* Current Password - Full Width */}
                <div className="group/input">
                    <Label htmlFor="current_password">
                        Current Password <Required />
                    </Label>
                    <Input
                        id="current_password"
                        name="current_password"
                        type="password"
                        placeholder="Enter your current password"
                        required
                        className="w-full"
                    />
                </div>

                {/* New Password Fields - Two Columns */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="group/input">
                        <Label htmlFor="new_password">
                            New Password <Required />
                        </Label>
                        <Input
                            id="new_password"
                            name="new_password"
                            type="password"
                            placeholder="At least 8 characters"
                            required
                            className="w-full"
                        />
                        <p className="text-muted mt-1.5 text-xs">Must be at least 8 characters long</p>
                    </div>
                    <div className="group/input">
                        <Label htmlFor="confirm_password">
                            Confirm New Password <Required />
                        </Label>
                        <Input
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            placeholder="Repeat new password"
                            required
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Error Message */}
                {status === 'error' && message && <Alert variant="error" message={message} className="mt-6 animate-[scale-in_0.3s_ease-out]" />}

                {/* Success Message */}
                {status === 'success' && message && (
                    <Alert variant="success" message={message} className="mt-6 animate-[scale-in_0.3s_ease-out]" />
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <FormSubmitButton
                        status={status}
                        labels={{
                            idle: 'Update Password',
                            submitting: 'Updating...',
                            success: 'Updated!',
                            error: 'Update Password',
                        }}
                    />
                    <button
                        type="button"
                        className="text-muted group/cancel hover:text-text rounded-lg px-6 py-2 font-semibold transition-all duration-300 hover:bg-black/5"
                    >
                        Cancel
                    </button>
                </div>
            </Form>
        </Card>
    )
}
