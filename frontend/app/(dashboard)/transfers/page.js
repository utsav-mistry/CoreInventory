'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';
import { transferAPI } from '@/lib/api';
import { formatDate, getErrorMessage } from '@/lib/utils';
import { CheckCircle, ArrowRight, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TransfersPage() {
  const router = useRouter();
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const { data } = await transferAPI.getAll({ limit: 50, status: statusFilter });
      setTransfers(data.data.transfers);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTransfers(); }, [statusFilter]);

  const handleValidate = async (id, e) => {
    e.stopPropagation();
    const t = toast.loading('Validating transfer...');
    try {
      await transferAPI.validate(id);
      toast.dismiss(t); toast.success('Transfer validated! Locations updated.');
      fetchTransfers();
    } catch (err) { toast.dismiss(t); toast.error(getErrorMessage(err)); }
  };

  return (
    <PageWrapper title="Internal Transfers" action={{ label: 'New Transfer', onClick: () => router.push('/transfers/new') }}>
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
            <Table headers={['Transfer #', 'From', 'To', 'Items', 'Status', 'Date', 'Actions']}>
              {transfers.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-gray-500 text-sm">No transfers found</td></tr>}
              {transfers.map(t => (
                <tr key={t._id} className="table-row cursor-pointer" onClick={() => router.push(`/transfers/${t._id}`)}>
                  <Td><code className="text-blue-400 text-xs font-mono">{t.transferNumber}</code></Td>
                  <Td>
                    <div>
                      <p className="text-sm text-white">{t.fromWarehouse?.name}</p>
                      <p className="text-xs text-gray-500">{t.fromLocation}</p>
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-gray-600" />
                      <div>
                        <p className="text-sm text-white">{t.toWarehouse?.name}</p>
                        <p className="text-xs text-gray-500">{t.toLocation}</p>
                      </div>
                    </div>
                  </Td>
                  <Td>{t.lineItems?.length} product(s)</Td>
                  <Td><StatusBadge status={t.status} /></Td>
                  <Td>{formatDate(t.createdAt)}</Td>
                  <Td>
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <Link href={`/transfers/${t._id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      {['draft', 'waiting', 'ready'].includes(t.status) && (
                        <button onClick={e => handleValidate(t._id, e)} className="p-1.5 rounded-lg hover:bg-green-500/10 text-gray-500 hover:text-green-400 transition-colors" title="Validate">
                          <CheckCircle className="w-4 h-4" />
                        </button>
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
