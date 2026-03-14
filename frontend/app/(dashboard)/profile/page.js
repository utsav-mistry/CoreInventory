'use client';
import { useState } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/lib/api';
import { getErrorMessage, formatDate } from '@/lib/utils';
import Input from '@/components/ui/Input';
import { User, Shield, Calendar, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuth();
  const [passwordForm, setPasswordForm] = useState({ email: user?.email || '', otp: '', newPassword: '', confirmPassword: '' });
  const [step, setStep] = useState(0); // 0: initial, 1: sent OTP, 2: done
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authAPI.forgotPassword(user?.email);
      toast.success('OTP sent to your email!');
      setStep(1);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return toast.error('Passwords do not match');
    if (passwordForm.newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await authAPI.resetPassword({ email: user.email, otp: passwordForm.otp, newPassword: passwordForm.newPassword });
      toast.success('Password changed successfully!');
      setStep(0);
      setPasswordForm({ email: user?.email || '', otp: '', newPassword: '', confirmPassword: '' });
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  const roleBadge = { admin: 'text-red-400 bg-red-500/10', manager: 'text-orange-400 bg-orange-500/10', staff: 'text-blue-400 bg-blue-500/10' };

  return (
    <PageWrapper title="My Profile">
      <div className="max-w-2xl space-y-6">
        {/* User Info */}
        <div className="glass-card p-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-brand-500/20 rounded-2xl flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-brand-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-1.5 mt-1"><Mail className="w-3.5 h-3.5" />{user?.email}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleBadge[user?.role] || roleBadge.staff}`}>
                  <Shield className="w-3 h-3 inline mr-1" />{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </span>
                <span className="text-xs text-gray-600 flex items-center gap-1"><Calendar className="w-3 h-3" />Joined {formatDate(user?.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="w-4 h-4 text-brand-400" />
            <h3 className="font-semibold text-white">Change Password</h3>
          </div>
          {step === 0 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <p className="text-sm text-gray-400">Click below to receive an OTP on your email <span className="text-white font-medium">{user?.email}</span></p>
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Sending OTP...' : 'Send OTP to my email'}
              </button>
            </form>
          )}
          {step === 1 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <p className="text-sm text-gray-400">Enter the 6-digit OTP sent to your email</p>
              <Input label="OTP Code" value={passwordForm.otp} onChange={e => setPasswordForm(p => ({ ...p, otp: e.target.value }))} placeholder="000000" maxLength={6} className="text-center font-mono tracking-widest" required />
              <Input label="New Password" type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))} placeholder="Min. 6 characters" required />
              <Input label="Confirm Password" type="password" value={passwordForm.confirmPassword} onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="Repeat new password" required />
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(0)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1">
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
