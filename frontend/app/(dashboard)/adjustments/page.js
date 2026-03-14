'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';
import { adjustmentAPI } from '@/lib/api';
import { formatDate, getErrorMessage } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AdjustmentsPage() {
  const router = useRouter();
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchAdjustments = async () => {
    setLoading(true);
    try {
      const { data } = await adjustmentAPI.getAll({ limit: 50, status: statusFilter });
      setAdjustments(data.data.adjustments);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAdjustments(); }, [statusFilter]);

  const handleValidate = async (id, e) => {
    e.stopPropagation();
    const t = toast.loading('Validating adjustment...');
    try {
      await adjustmentAPI.validate(id);
      toast.dismiss(t); toast.success('Adjustment validated! Stock synchronized.');
      fetchAdjustments();
    } catch (err) { toast.dismiss(t); toast.error(getErrorMessage(err)); }
  };

  return (
    <PageWrapper title="Stock Adjustments" action={{ label: 'New Adjustment', onClick: () => router.push('/adjustments/new') }}>
      <div className="space-y-5">
        <div className="glass-card p-4 flex gap-3">
          {['', 'draft', 'done'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-gray-500 hover:text-white'}`}>
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
            </button>
          ))}
        </div>
        <div className="glass-card">
          {loading ? <PageLoader /> : (
            <Table headers={['Adjustment #', 'Items', 'Status', 'Created', 'Actions']}>
              {adjustments.length === 0 && <tr><td colSpan={5} className="text-center py-12 text-gray-500 text-sm">No adjustments found</td></tr>}
              {adjustments.map(a => (
                <tr key={a._id} className="table-row">
                  <Td><code className="text-purple-400 text-xs font-mono">{a.adjustmentNumber}</code></Td>
                  <Td>
                    <div>
                      {a.lineItems?.slice(0, 2).map((item, i) => (
                        <p key={i} className="text-xs text-gray-400">{item.product?.name} ({item.countedQuantity} counted, system: {item.systemQuantity})</p>
                      ))}
                      {a.lineItems?.length > 2 && <p className="text-xs text-gray-600">+{a.lineItems.length - 2} more</p>}
                    </div>
                  </Td>
                  <Td><StatusBadge status={a.status} /></Td>
                  <Td>{formatDate(a.createdAt)}</Td>
                  <Td>
                    {a.status === 'draft' && (
                      <button onClick={e => handleValidate(a._id, e)} className="p-1.5 rounded-lg hover:bg-green-500/10 text-gray-500 hover:text-green-400 transition-colors" title="Validate">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
