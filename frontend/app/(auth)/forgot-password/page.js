'use client';
import { useState } from 'react';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import { Boxes, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: email, 2: otp + new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword(email);
      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await authAPI.resetPassword({ email, otp, newPassword });
      toast.success('Password reset! Please login.');
      router.push('/login');
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mx-auto mb-4"><Boxes className="w-6 h-6 text-white" /></div>
          <h1 className="text-2xl font-bold text-white">{step === 1 ? 'Forgot Password' : 'Enter OTP'}</h1>
          <p className="text-gray-500 mt-1 text-sm">{step === 1 ? 'Enter your email to receive an OTP' : `Check your email for the OTP`}</p>
        </div>
        <div className="glass-card p-8">
          {step === 1 ? (
            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="email" className="input-field pl-9" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">{loading ? 'Sending...' : 'Send OTP'}</button>
            </form>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">OTP Code</label>
                <input className="input-field text-center text-xl tracking-[0.5em] font-mono" value={otp} onChange={e => setOtp(e.target.value)} placeholder="000000" maxLength={6} required />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">New Password</label>
                <input type="password" className="input-field" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 6 characters" required />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">{loading ? 'Resetting...' : 'Reset Password'}</button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-500 hover:text-white flex items-center justify-center gap-1 mt-2">
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            </form>
          )}
          <p className="text-center mt-5 text-sm text-gray-500"><Link href="/login" className="text-brand-400 hover:text-brand-300">Back to login</Link></p>
        </div>
      </div>
    </div>
  );
}
