'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import { deliveryAPI } from '@/lib/api';
import { PageLoader } from '@/components/ui/Spinner';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDateTime, getErrorMessage } from '@/lib/utils';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function DeliveryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);

  useEffect(() => {
    deliveryAPI.getById(id)
      .then(({ data }) => setDelivery(data.data.delivery))
      .catch(err => { toast.error(getErrorMessage(err)); router.push('/deliveries'); })
      .finally(() => setLoading(false));
  }, [id]);

  const handleValidate = async () => {
    setValidating(true);
    try {
      await deliveryAPI.validate(id);
      toast.success('Delivery validated! Stock decreased.');
      const { data } = await deliveryAPI.getById(id);
      setDelivery(data.data.delivery);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setValidating(false); }
  };

  const handleCancel = async () => {
    if (!confirm('Cancel this delivery?')) return;
    try {
      await deliveryAPI.cancel(id);
      toast.success('Delivery canceled');
      router.push('/deliveries');
    } catch (err) { toast.error(getErrorMessage(err)); }
  };

  if (loading) return <PageWrapper title="Delivery"><PageLoader /></PageWrapper>;
  if (!delivery) return null;

  const canAction = ['draft', 'waiting', 'ready'].includes(delivery.status);

  return (
    <PageWrapper title={delivery.deliveryNumber}>
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/deliveries" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Back to Deliveries
          </Link>
          <div className="flex items-center gap-3">
            {canAction && (
              <>
                <button onClick={handleValidate} disabled={validating} className="btn-primary flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {validating ? 'Validating...' : 'Validate Delivery'}
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
              <code className="text-orange-400 font-mono text-sm">{delivery.deliveryNumber}</code>
              <h2 className="text-xl font-semibold text-white mt-1">{delivery.customer}</h2>
              {delivery.shippingAddress && <p className="text-sm text-gray-500 mt-1">{delivery.shippingAddress}</p>}
            </div>
            <StatusBadge status={delivery.status} />
          </div>
          <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-5">
            <div>
              <p className="text-xs text-gray-500 mb-1">Warehouse</p>
              <p className="text-sm text-white">{delivery.warehouse?.name}</p>
              <p className="text-xs text-gray-500">Location: {delivery.locationName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Created By</p>
              <p className="text-sm text-white">{delivery.createdBy?.name}</p>
              <p className="text-xs text-gray-500">{formatDateTime(delivery.createdAt)}</p>
            </div>
            {delivery.validatedBy && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Validated By</p>
                <p className="text-sm text-white">{delivery.validatedBy?.name}</p>
                <p className="text-xs text-gray-500">{formatDateTime(delivery.validatedAt)}</p>
              </div>
            )}
          </div>
          {delivery.note && (
            <div className="mt-4 p-3 bg-surface-100 rounded-lg border border-white/5">
              <p className="text-xs text-gray-500 mb-1">Note</p>
              <p className="text-sm text-gray-300">{delivery.note}</p>
            </div>
          )}
        </div>

        <div className="glass-card">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="font-semibold text-white">Line Items</h3>
          </div>
          <div className="divide-y divide-white/5">
            {delivery.lineItems?.map((item, i) => (
              <div key={i} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.product?.name}</p>
                  <p className="text-xs text-gray-500">{item.product?.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-medium">{item.quantity} {item.unitOfMeasure}</p>
                  {item.product && <p className="text-xs text-gray-500">Available: {item.product.totalStock}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
