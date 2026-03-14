'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Input from '@/components/ui/Input';
import { User, Mail, Lock, Boxes, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '@/lib/api';
import { getErrorMessage, cn } from '@/lib/utils';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuthenticatedUser } = useAuth();
  
  const [isFreshSystem, setIsFreshSystem] = useState(null); // null means loading
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'staff', otp: '' });

  // Check if system is fresh on mount
  useEffect(() => {
    authAPI.getStatus()
      .then(({ data }) => setIsFreshSystem(data.data.isFresh))
      .catch(err => {
        console.error('Status check failed:', err);
        setIsFreshSystem(false);
      });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isFreshSystem && !acceptedTerms) {
      return toast.error('Please accept the Terms & Conditions first.');
    }
    
    setLoading(true);
    try {
      const payload = { ...formData };
      if (isFreshSystem) payload.role = 'admin'; // Override role structurally for fresh system
      
      const { data } = await authAPI.register(payload);
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
        // User (First Admin) approved and logged in instantly
        toast.success('System Initialized! Welcome Admin.');
        setAuthenticatedUser(data.data.user, data.data.accessToken, data.data.refreshToken);
        router.push('/');
      } else {
        // Regular user verified but pending admin approval
        toast.success('Email verified! Awaiting Admin approval.');
        router.push('/login');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Wait for status check
  if (isFreshSystem === null) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin mb-4" />
        <p className="text-gray-400">Verifying system state...</p>
      </div>
    );
  }

  const isFormDisabled = isFreshSystem && !acceptedTerms;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-surface">
      
      {/* --- Fresh System Left Panel (70%) --- */}
      {isFreshSystem && (
        <div className="flex-1 lg:w-[70%] p-8 lg:p-20 bg-gradient-to-br from-brand-600/10 to-transparent flex flex-col justify-center overflow-y-auto">
          <div className="max-w-2xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-brand-500 rounded-xl"><Boxes className="w-8 h-8 text-white" /></div>
              <h1 className="text-4xl font-bold text-white tracking-tight">CoreInventory</h1>
            </div>
            
            <h2 className="text-3xl font-semibold text-white mb-6">
              System Initialization & Onboarding
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              Welcome to the setup wizard. Before claiming the original administrator account, please review our enterprise terms.
            </p>

            <div className="p-6 bg-surface-100 rounded-2xl border border-white/5 space-y-4 mb-10">
              <h3 className="text-white font-medium">Terms and Conditions</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" /> 
                  <span>All data generated is property of the enterprise and subject to internal auditing.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" /> 
                  <span>Admins have full oversight of all user actions and stock movements.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" /> 
                  <span>As the root administrator, you are responsible for approving subsequent staff accounts.</span>
                </li>
              </ul>
            </div>

            <button 
              type="button"
              onClick={() => setAcceptedTerms(!acceptedTerms)}
              className={cn(
                "px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 w-full sm:w-auto",
                acceptedTerms 
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25" 
                  : "bg-surface-100 text-gray-400 border border-white/10 hover:bg-white/5"
              )}
            >
              {acceptedTerms ? <CheckCircle2 className="w-5 h-5" /> : null}
              {acceptedTerms ? "Terms Accepted" : "I Accept the Terms & Conditions"}
            </button>
          </div>
        </div>
      )}

      {/* --- Registration Form Right Panel (30% or Centered) --- */}
      <div className={cn(
        "bg-surface-100 border-l border-white/5 flex flex-col justify-center p-8 lg:p-12 h-screen overflow-y-auto w-full",
        isFreshSystem ? "lg:w-[30%]" : "max-w-md mx-auto h-auto min-h-screen"
      )}>
        
        {/* Grey-out overlay behavior */}
        <div className={cn(
          "space-y-8 w-full max-w-sm mx-auto transition-all duration-300", 
          isFormDisabled ? "opacity-30 grayscale pointer-events-none" : "opacity-100"
        )}>
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">{step === 1 ? 'Register Account' : 'Verify Email'}</h3>
            <p className="text-gray-500 text-sm">
              {step === 1 
                ? (isFreshSystem ? 'Set up the root administrator.' : 'Enter details to start onboarding.') 
                : 'We sent a 6-digit code to your inbox'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-5">
              <Input label="Full Name" icon={User} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
              <Input label="Email Address" type="email" icon={Mail} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              <Input label="Password" type="password" icon={Lock} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
              
              <button type="submit" disabled={loading} className="w-full btn-primary py-3 font-semibold shadow-xl shadow-brand-500/20 mt-4">
                {loading ? 'Processing...' : (isFreshSystem ? 'Initialize System' : 'Submit Registration')}
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
              <button type="button" onClick={() => setStep(1)} className="text-xs text-brand-400 hover:text-brand-300 w-full text-center">Change Email Details</button>
            </form>
          )}

          <div className="text-center pt-8 border-t border-white/5">
             <Link href="/login" className="text-xs text-brand-400 hover:text-brand-300 font-medium transition-colors">
               Already have an account? Sign in
             </Link>
          </div>
        </div>

        {/* Floating warning if form is disabled */}
        {isFormDisabled && step === 1 && (
          <div className="mt-8 flex flex-col items-center gap-3 animate-pulse px-4 text-center">
            <AlertCircle className="w-8 h-8 text-brand-500/50" />
            <p className="text-sm text-brand-400 font-medium">Please accept the Terms & Conditions on the left to unlock registration.</p>
          </div>
        )}

      </div>
    </div>
  );
}
