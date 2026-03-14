'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';
import { receiptAPI } from '@/lib/api';
import { formatDate, getErrorMessage } from '@/lib/utils';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ReceiptsPage() {
  const router = useRouter();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchReceipts = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await receiptAPI.getAll({ limit: 50, status: statusFilter, ...params });
      setReceipts(data.data.receipts);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReceipts(); }, [statusFilter]);

  const handleValidate = async (id, e) => {
    e.stopPropagation();
    const loadingToast = toast.loading('Validating receipt...');
    try {
      await receiptAPI.validate(id, {});
      toast.dismiss(loadingToast);
      toast.success('Receipt validated! Stock updated.');
      fetchReceipts();
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(getErrorMessage(err));
    }
  };

  const handleCancel = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Cancel this receipt?')) return;
    try {
      await receiptAPI.cancel(id);
      toast.success('Receipt canceled');
      fetchReceipts();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  return (
    <PageWrapper title="Receipts" action={{ label: 'New Receipt', onClick: () => router.push('/receipts/new') }}>
      <div className="space-y-5">
        <div className="glass-card p-4 flex gap-3">
          {['', 'draft', 'waiting', 'ready', 'done', 'canceled'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-gray-500 hover:text-white'}`}>
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
            </button>
          ))}
        </div>

        <div className="glass-card">
          {loading ? <PageLoader /> : (
            <Table headers={['Receipt #', 'Supplier', 'Warehouse', 'Items', 'Status', 'Date', 'Actions']}>
              {receipts.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-gray-500 text-sm">No receipts found</td></tr>}
              {receipts.map(r => (
                <tr key={r._id} className="table-row cursor-pointer" onClick={() => router.push(`/receipts/${r._id}`)}>
                  <Td><code className="text-brand-400 text-xs font-mono">{r.receiptNumber}</code></Td>
                  <Td className="font-medium text-white">{r.supplier}</Td>
                  <Td>{r.warehouse?.name}</Td>
                  <Td>{r.lineItems?.length} product(s)</Td>
                  <Td><StatusBadge status={r.status} /></Td>
                  <Td>{formatDate(r.createdAt)}</Td>
                  <Td>
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <Link href={`/receipts/${r._id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      {['draft', 'waiting', 'ready'].includes(r.status) && (
                        <>
                          <button onClick={e => handleValidate(r._id, e)} className="p-1.5 rounded-lg hover:bg-green-500/10 text-gray-500 hover:text-green-400 transition-colors" title="Validate">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={e => handleCancel(r._id, e)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors" title="Cancel">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
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
