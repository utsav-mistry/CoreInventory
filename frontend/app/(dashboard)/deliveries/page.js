'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { StatusBadge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';
import { deliveryAPI } from '@/lib/api';
import { formatDate, getErrorMessage } from '@/lib/utils';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DeliveriesPage() {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchDeliveries = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await deliveryAPI.getAll({ limit: 50, status: statusFilter, ...params });
      setDeliveries(data.data.deliveries);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDeliveries(); }, [statusFilter]);

  const handleValidate = async (id, e) => {
    e.stopPropagation();
    const t = toast.loading('Validating delivery...');
    try {
      await deliveryAPI.validate(id);
      toast.dismiss(t);
      toast.success('Delivery validated! Stock decreased.');
      fetchDeliveries();
    } catch (err) { toast.dismiss(t); toast.error(getErrorMessage(err)); }
  };

  const handleCancel = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Cancel this delivery?')) return;
    try {
      await deliveryAPI.cancel(id);
      toast.success('Delivery canceled');
      fetchDeliveries();
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  return (
    <PageWrapper title="Deliveries" action={{ label: 'New Delivery', onClick: () => router.push('/deliveries/new') }}>
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
            <Table headers={['Delivery #', 'Customer', 'Warehouse', 'Items', 'Status', 'Date', 'Actions']}>
              {deliveries.length === 0 && <tr><td colSpan={7} className="text-center py-12 text-gray-500 text-sm">No deliveries found</td></tr>}
              {deliveries.map(d => (
                <tr key={d._id} className="table-row cursor-pointer" onClick={() => router.push(`/deliveries/${d._id}`)}>
                  <Td><code className="text-orange-400 text-xs font-mono">{d.deliveryNumber}</code></Td>
                  <Td className="font-medium text-white">{d.customer}</Td>
                  <Td>{d.warehouse?.name}</Td>
                  <Td>{d.lineItems?.length} product(s)</Td>
                  <Td><StatusBadge status={d.status} /></Td>
                  <Td>{formatDate(d.createdAt)}</Td>
                  <Td>
                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <Link href={`/deliveries/${d._id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      {['draft', 'waiting', 'ready'].includes(d.status) && (
                        <>
                          <button onClick={e => handleValidate(d._id, e)} className="p-1.5 rounded-lg hover:bg-green-500/10 text-gray-500 hover:text-green-400 transition-colors" title="Validate">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={e => handleCancel(d._id, e)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors" title="Cancel">
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
