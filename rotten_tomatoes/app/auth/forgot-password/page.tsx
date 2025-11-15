'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { sendEmailReset } from '@/lib/authApi';
export default function Login() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await sendEmailReset(email);

        } catch (err: any) {
            setError(err.message);

        } finally {
            setEmail('')
            setLoading(false);
        }
    }
    return (
        <div className='bg-[url("/images/login.webp")] h-screen'>
            <div className='min-h-screen  flex items-center justify-center p-4'>
                <div className='max-w-lg w-full bg-black/60 rounded-xl shadow-lg p-8'>
                    <h2 className='text-2xl font-bold text mb-6 text-center text-red-600'>Reset password</h2>

                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <label className='block text-sm font-medium text-gray-300 mb-1'>Email</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='text-white w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-black'
                                placeholder='your@email.com'
                            />
                        </div>



                        <div className='flex items-center justify-between'>


                        </div>

                        {error && <p className='text-sm text-red-500 text-center'>{error}</p>}

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50'
                        >
                            {loading ? 'Sending...' : 'Send reset link'}
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
}
