'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import { productAPI } from '@/lib/api';
import { PageLoader } from '@/components/ui/Spinner';
import { StockBadge } from '@/components/ui/Badge';
import { formatDate, getErrorMessage } from '@/lib/utils';
import { ArrowLeft, Package, MapPin, BarChart2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getById(id)
      .then(({ data }) => setProduct(data.data.product))
      .catch(err => { toast.error(getErrorMessage(err)); router.push('/products'); })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageWrapper title="Product"><PageLoader /></PageWrapper>;
  if (!product) return null;

  return (
    <PageWrapper title={product.name}>
      <div className="max-w-4xl space-y-6">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 glass-card p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                <code className="text-sm text-brand-400 font-mono">{product.sku}</code>
              </div>
              <StockBadge status={product.stockStatus} />
            </div>
            {product.description && <p className="text-sm text-gray-400">{product.description}</p>}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div>
                <p className="text-xs text-gray-500 mb-1">Category</p>
                {product.category && (
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: product.category.color }} />
                    <span className="text-sm text-white">{product.category.name}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Unit of Measure</p>
                <p className="text-sm text-white">{product.unitOfMeasure}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Price</p>
                <p className="text-sm text-white">{product.price ? `$${product.price.toLocaleString()}` : '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Reorder Point</p>
                <p className="text-sm text-white">{product.reorderPoint} {product.unitOfMeasure}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Created</p>
                <p className="text-sm text-white">{formatDate(product.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Stock Summary */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-4 h-4 text-brand-400" />
              <h3 className="font-semibold text-white">Stock Summary</h3>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-white tabular-nums">{product.totalStock?.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Total {product.unitOfMeasure}</p>
            </div>
            <div className="space-y-3 mt-4 border-t border-white/5 pt-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">By Location</p>
              {product.stockByLocation?.length === 0 && (
                <p className="text-sm text-gray-600">No stock in any location</p>
              )}
              {product.stockByLocation?.map((loc, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-400">{loc.warehouse?.name} / {loc.locationName}</span>
                  </div>
                  <span className="text-sm font-medium text-white tabular-nums">{loc.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
