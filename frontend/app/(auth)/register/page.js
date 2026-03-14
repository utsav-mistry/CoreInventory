'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import { User, Mail, Lock, ShieldCheck, Boxes, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api';
import { getErrorMessage, cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuthenticatedUser } = useAuth();
  
  const [isFreshSystem, setIsFreshSystem] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'staff', otp: '' });

  // Check if system is fresh on mount
  useEffect(() => {
    authAPI.getStatus()
      .then(({ data }) => setIsFreshSystem(data.data.isFresh))
      .catch(err => console.error('Status check failed:', err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isFreshSystem && !acceptedTerms) {
      return toast.error('Please accept the Terms & Conditions first.');
    }
    
    setLoading(true);
    try {
      const { data } = await authAPI.register(formData);
      toast.success(data.message || 'Verification code sent.');
      setStep(2);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (formData.otp.length !== 6) return toast.error('Enter 6-digit code.');
    
    setLoading(true);
    try {
      const { data } = await authAPI.verifyEmail({ email: formData.email, otp: formData.otp });
      
      if (data.data && data.data.accessToken) {
        // User (First Admin) approved and logged in
        toast.success('System Initialized! Welcome Admin.');
        setAuthenticatedUser(data.data.user, data.data.accessToken, data.data.refreshToken);
        router.push('/');
      } else {
        // Regular user verified but pending approval
        toast.success('Email verified! Awaiting Admin approval.');
        router.push('/login');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const isFormDisabled = isFreshSystem && !acceptedTerms;

  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      {/* 70% Left Side - Information & Terms */}
      <div className={cn(
        "flex-1 p-12 lg:p-24 transition-all duration-700 bg-gradient-to-br from-brand-600/10 to-transparent",
        isFreshSystem ? "w-7/10 opacity-100" : "flex-shrink opacity-100"
      )}>
        <div className="max-w-2xl h-full flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-brand-500 rounded-xl"><Boxes className="w-8 h-8 text-white" /></div>
            <h1 className="text-4xl font-bold text-white tracking-tight">CoreInventory</h1>
          </div>
          
          <h2 className="text-3xl font-semibold text-white mb-6">
            {isFreshSystem ? "System Initialization & Onboarding" : "Join the Inventory Network"}
          </h2>
          
          <div className="prose prose-invert max-w-none text-gray-400 space-y-4 mb-10 overflow-y-auto max-h-[40vh] pr-4 custom-scrollbar">
            <p className="text-lg text-gray-300">
              Transform your warehouse operations with precision tracking, real-time analytics, and seamless collaboration.
            </p>
            <div className="p-6 bg-surface-100 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-white font-medium">Terms and Conditions</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-brand-400 mt-1 flex-shrink-0" /> All data generated is property of the enterprise and subject to internal auditing.</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-brand-400 mt-1 flex-shrink-0" /> Admins have full oversight of all user actions and stock movements.</li>
                <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-brand-400 mt-1 flex-shrink-0" /> Accounts must be approved by an administrator before system access is granted.</li>
              </ul>
            </div>
          </div>

          {isFreshSystem && (
            <div className="flex items-center gap-4 animate-fade-in">
              <button 
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className={cn(
                  "px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2",
                  acceptedTerms ? "bg-brand-500 text-white" : "bg-white/10 text-gray-400 border border-white/10 hover:bg-white/15"
                )}
              >
                {acceptedTerms && <CheckCircle2 className="w-5 h-5" />}
                {acceptedTerms ? "Terms Accepted" : "Accept Terms to Register"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 30% Right Side - Registration Form */}
      <div className={cn(
        "bg-surface-100 border-l border-white/5 flex flex-col justify-center p-8 lg:p-12 transition-all duration-700",
        isFreshSystem ? "w-3/10" : "w-full lg:max-w-md ml-auto"
      )}>
        <div className={cn("space-y-8", isFormDisabled && "opacity-40 grayscale pointer-events-none transition-all duration-500")}>
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">{step === 1 ? 'Register Account' : 'Verify Email'}</h3>
            <p className="text-gray-500 text-sm">
              {step === 1 ? 'Enter details to start onboarding' : 'We sent a 6-digit code to your inbox'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <Input label="Name" icon={User} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <Input label="Email" type="email" icon={Mail} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              <Input label="Password" type="password" icon={Lock} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
              
              {!isFreshSystem && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-500 mb-1 ml-1 block">Requested Role</label>
                  <select className="input-field py-2.5" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })}>
                    <option value="staff">Operations Staff</option>
                    <option value="manager">Warehouse Manager</option>
                  </select>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full btn-primary py-3 font-semibold shadow-xl shadow-brand-500/20">
                {loading ? 'Initializing...' : (isFreshSystem ? 'Setup Original Admin' : 'Submit Registration')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500 text-center block">Verification Code</label>
                <input 
                  className="input-field text-center text-3xl tracking-[0.4em] font-mono py-4" 
                  maxLength={6}
                  value={formData.otp}
                  onChange={e => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                  required 
                />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary py-3 font-semibold">
                {loading ? 'Verifying...' : 'Complete Onboarding'}
              </button>
              <button type="button" onClick={() => setStep(1)} className="text-xs text-gray-500 hover:text-white w-full text-center">Back to Edit</button>
            </form>
          )}

          <div className="text-center pt-8 border-t border-white/5">
             <Link href="/login" className="text-xs text-brand-400 hover:text-brand-300 font-medium">Already have an account? Sign in</Link>
          </div>
        </div>

        {isFormDisabled && (
          <div className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-3 animate-pulse px-8 text-center">
            <AlertCircle className="w-10 h-10 text-brand-500/50" />
            <p className="text-sm text-gray-600 font-medium max-w-[15rem]">Please read and accept the Terms on the left to activate registration</p>
          </div>
        )}
      </div>
    </div>
  );
}
