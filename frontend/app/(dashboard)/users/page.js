'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { useAuth } from '@/context/AuthContext';
import { authAPI } from '@/lib/api';
import { PageLoader } from '@/components/ui/Spinner';
import { Shield, User, Mail, Calendar, Check, X, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate, cn } from '@/lib/utils';

export default function UsersManagementPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await authAPI.getUsers();
      setUsers(data.data.users);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId, status, role) => {
    setUpdatingId(userId);
    try {
      await authAPI.updateUserStatus(userId, { status, role });
      toast.success(`User successfully ${status}`);
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update user');
    } finally {
      setUpdatingId(null);
    }
  };

  if (currentUser?.role !== 'admin') {
    return (
      <PageWrapper title="Access Denied">
        <div className="h-[60vh] flex flex-col items-center justify-center text-center">
          <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Administrator Access Required</h2>
          <p className="text-gray-400">You do not have permission to view this page.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="User Management" subtitle="Manage account approvals and organizational roles">
      <div className="space-y-6">
        {loading ? (
          <PageLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="glass-card p-6 flex flex-col relative overflow-hidden group">
                {/* Status Indicator Bar */}
                <div className={cn(
                  "absolute top-0 left-0 w-1 h-full",
                  user.status === 'approved' ? "bg-green-500" : user.status === 'pending' ? "bg-yellow-500" : "bg-red-500"
                )} />

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center border border-white/5">
                    <User className="w-6 h-6 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold leading-tight">{user.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 uppercase tracking-wider font-medium">
                      {user.role}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail className="w-4 h-4 text-gray-600" />
                    {user.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    Joined {formatDate(user.createdAt)}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                  {user.status === 'pending' ? (
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1.5 mb-2">
                        <label className="text-[10px] text-gray-600 uppercase font-bold tracking-widest ml-1">Assign System Role</label>
                        <select 
                          id={`role-${user._id}`}
                          className="input-field py-2 text-sm"
                          defaultValue={user.role}
                        >
                          <option value="staff">Staff</option>
                          <option value="manager">Manager</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const role = document.getElementById(`role-${user._id}`).value;
                            handleStatusUpdate(user._id, 'approved', role);
                          }}
                          disabled={updatingId === user._id}
                          className="flex-1 btn-primary py-2 text-xs flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 shadow-lg shadow-green-900/20"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button 
                          onClick={() => handleStatusUpdate(user._id, 'rejected')}
                          disabled={updatingId === user._id}
                          className="btn-primary py-2 px-3 text-xs flex items-center justify-center bg-red-600 hover:bg-red-500"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full border",
                        user.status === 'approved' ? "border-green-500/20 text-green-400 bg-green-500/5" : "border-red-500/20 text-red-400 bg-red-500/5"
                      )}>
                        {user.status}
                      </span>
                      {user._id !== currentUser._id && (
                        <button 
                          onClick={() => handleStatusUpdate(user._id, user.status === 'approved' ? 'rejected' : 'approved')}
                          className="text-xs text-gray-500 hover:text-white transition-colors"
                        >
                          Revoke Access
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
