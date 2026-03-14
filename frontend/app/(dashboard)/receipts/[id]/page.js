'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import { receiptAPI } from '@/lib/api';
import { PageLoader } from '@/components/ui/Spinner';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDateTime, getErrorMessage } from '@/lib/utils';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ReceiptDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    receiptAPI.getById(id)
      .then(({ data }) => setReceipt(data.data.receipt))
      .catch(err => { toast.error(getErrorMessage(err)); router.push('/receipts'); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleValidate = async () => {
    setValidating(true);
    try {
      await receiptAPI.validate(id, {});
      toast.success('Receipt validated! Stock updated.');
      const { data } = await receiptAPI.getById(id);
      setReceipt(data.data.receipt);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setValidating(false); }
  };

  const handleCancel = async () => {
    if (!confirm('Cancel this receipt? This cannot be undone.')) return;
    try {
      await receiptAPI.cancel(id);
      toast.success('Receipt canceled');
      router.push('/receipts');
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  if (loading) return <PageWrapper title="Receipt"><PageLoader /></PageWrapper>;
  if (!receipt) return null;

  const canAction = ['draft', 'waiting', 'ready'].includes(receipt.status);

  return (
    <PageWrapper title={receipt.receiptNumber}>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/receipts" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Receipts
          </Link>
          <div className="flex items-center gap-3">
            {canAction && (
              <>
                <button onClick={handleValidate} disabled={validating} className="btn-primary flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {validating ? 'Validating...' : 'Validate Receipt'}
                </button>
                <button onClick={handleCancel} className="btn-danger flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <code className="text-brand-400 font-mono text-sm">{receipt.receiptNumber}</code>
              <h2 className="text-xl font-semibold text-white mt-1">{receipt.supplier}</h2>
            </div>
            <StatusBadge status={receipt.status} />
          </div>
          <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-5">
            <div>
              <p className="text-xs text-gray-500 mb-1">Warehouse</p>
              <p className="text-sm text-white">{receipt.warehouse?.name}</p>
              <p className="text-xs text-gray-500">Location: {receipt.locationName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Created By</p>
              <p className="text-sm text-white">{receipt.createdBy?.name}</p>
              <p className="text-xs text-gray-500">{formatDateTime(receipt.createdAt)}</p>
            </div>
            {receipt.validatedBy && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Validated By</p>
                <p className="text-sm text-white">{receipt.validatedBy?.name}</p>
                <p className="text-xs text-gray-500">{formatDateTime(receipt.validatedAt)}</p>
              </div>
            )}
          </div>
          {receipt.note && (
            <div className="mt-4 p-3 bg-surface-100 rounded-lg border border-white/5">
              <p className="text-xs text-gray-500 mb-1">Note</p>
              <p className="text-sm text-gray-300">{receipt.note}</p>
            </div>
          )}
        </div>

        <div className="glass-card">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="font-semibold text-white">Line Items</h3>
          </div>
          <div className="divide-y divide-white/5">
            {receipt.lineItems?.map((item, i) => (
              <div key={i} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.product?.name}</p>
                  <p className="text-xs text-gray-500">{item.product?.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">Expected: <span className="font-medium">{item.expectedQuantity} {item.unitOfMeasure}</span></p>
                  {receipt.status === 'done' && <p className="text-xs text-green-400">Received: {item.receivedQuantity}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
