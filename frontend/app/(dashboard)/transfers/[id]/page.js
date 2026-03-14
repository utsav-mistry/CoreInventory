'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import { transferAPI } from '@/lib/api';
import { PageLoader } from '@/components/ui/Spinner';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDateTime, getErrorMessage } from '@/lib/utils';
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function TransferDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [transfer, setTransfer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    transferAPI.getById(id)
      .then(({ data }) => setTransfer(data.data.transfer))
      .catch(err => { toast.error(getErrorMessage(err)); router.push('/transfers'); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleValidate = async () => {
    setValidating(true);
    try {
      await transferAPI.validate(id);
      toast.success('Transfer validated!');
      const { data } = await transferAPI.getById(id);
      setTransfer(data.data.transfer);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setValidating(false); }
  };

  if (loading) return <PageWrapper title="Transfer"><PageLoader /></PageWrapper>;
  if (!transfer) return null;

  const canValidate = ['draft', 'waiting', 'ready'].includes(transfer.status);

  return (
    <PageWrapper title={transfer.transferNumber}>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/transfers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Transfers
          </Link>
          {canValidate && (
            <button onClick={handleValidate} disabled={validating} className="btn-primary flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {validating ? 'Validating...' : 'Validate Transfer'}
            </button>
          )}
        </div>

        <div className="glass-card p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <code className="text-blue-400 font-mono text-sm">{transfer.transferNumber}</code>
              <div className="flex items-center gap-3 mt-2">
                <div>
                  <p className="text-sm text-white font-medium">{transfer.fromWarehouse?.name}</p>
                  <p className="text-xs text-gray-500">{transfer.fromLocation}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-white font-medium">{transfer.toWarehouse?.name}</p>
                  <p className="text-xs text-gray-500">{transfer.toLocation}</p>
                </div>
              </div>
            </div>
            <StatusBadge status={transfer.status} />
          </div>
          <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-5">
            <div>
              <p className="text-xs text-gray-500 mb-1">Created By</p>
              <p className="text-sm text-white">{transfer.createdBy?.name}</p>
              <p className="text-xs text-gray-500">{formatDateTime(transfer.createdAt)}</p>
            </div>
            {transfer.reason && <div><p className="text-xs text-gray-500 mb-1">Reason</p><p className="text-sm text-white">{transfer.reason}</p></div>}
            {transfer.validatedBy && <div><p className="text-xs text-gray-500 mb-1">Validated By</p><p className="text-sm text-white">{transfer.validatedBy?.name}</p><p className="text-xs text-gray-500">{formatDateTime(transfer.validatedAt)}</p></div>}
          </div>
        </div>

        <div className="glass-card">
          <div className="px-5 py-4 border-b border-white/5"><h3 className="font-semibold text-white">Line Items</h3></div>
          <div className="divide-y divide-white/5">
            {transfer.lineItems?.map((item, i) => (
              <div key={i} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.product?.name}</p>
                  <p className="text-xs text-gray-500">{item.product?.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-medium">{item.quantity} {item.unitOfMeasure}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
