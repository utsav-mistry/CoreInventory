'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import Input from '@/components/ui/Input';
import { adjustmentAPI, productAPI, warehouseAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import { Plus, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewAdjustmentPage() {
  const router = useRouter();
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [activeItemIdx, setActiveItemIdx] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [note, setNote] = useState('');
  const [lineItems, setLineItems] = useState([{ product: '', warehouse: '', locationName: '', countedQuantity: 0, reason: '' }]);

  useEffect(() => { warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses)); }, []);
  useEffect(() => {
    if (productSearch.length >= 1) productAPI.getAll({ search: productSearch, limit: 10 }).then(({ data }) => setProducts(data.data.products));
    else setProducts([]);
  }, [productSearch]);

  const addLineItem = () => setLineItems(p => [...p, { product: '', warehouse: '', locationName: '', countedQuantity: 0, reason: '' }]);
  const removeLineItem = (i) => setLineItems(p => p.filter((_, idx) => idx !== i));
  const updateLineItem = (i, field, value) => setLineItems(p => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  const selectProduct = (i, product) => {
    setLineItems(p => p.map((item, idx) => idx === i ? { ...item, product: product._id, _productName: product.name, _productSku: product.sku } : item));
    setProductSearch(''); setProducts([]); setActiveItemIdx(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lineItems.some(l => !l.product || !l.warehouse || !l.locationName)) return toast.error('All line items must have a product, warehouse, and location');
    setSubmitting(true);
    try {
      await adjustmentAPI.create({
        note,
        lineItems: lineItems.map(l => ({
          product: l.product,
          warehouse: l.warehouse,
          locationName: l.locationName,
          countedQuantity: Number(l.countedQuantity),
          reason: l.reason,
        }))
      });
      toast.success('Adjustment created!');
      router.push('/adjustments');
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSubmitting(false); }
  };

  return (
    <PageWrapper title="New Stock Adjustment">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-white">Adjustment Details</h2>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-400">Note (optional)</label>
            <textarea className="input-field resize-none" rows={2} value={note} onChange={e => setNote(e.target.value)} placeholder="E.g. Annual stock count, damage write-off..." />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Products to Adjust</h2>
            <button type="button" onClick={addLineItem} className="btn-secondary flex items-center gap-1.5 text-sm py-1.5">
              <Plus className="w-3.5 h-3.5" /> Add Product
            </button>
          </div>
          <div className="space-y-3">
            {lineItems.map((item, i) => (
              <div key={i} className="bg-surface-100 rounded-xl p-4 space-y-3 border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Item #{i + 1}</span>
                  {lineItems.length > 1 && (
                    <button type="button" onClick={() => removeLineItem(i)} className="text-gray-600 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                </div>
                {item._productName ? (
                  <div className="flex items-center justify-between bg-surface-200 rounded-lg px-3 py-2">
                    <div><p className="text-sm text-white font-medium">{item._productName}</p><p className="text-xs text-gray-500">{item._productSku}</p></div>
                    <button type="button" onClick={() => setLineItems(p => p.map((l, idx) => idx === i ? { ...l, product: '', _productName: '', _productSku: '' } : l))} className="text-xs text-gray-500 hover:text-white">Change</button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-9" placeholder="Search product..." value={activeItemIdx === i ? productSearch : ''} onChange={e => { setProductSearch(e.target.value); setActiveItemIdx(i); }} onFocus={() => setActiveItemIdx(i)} />
                    {products.length > 0 && activeItemIdx === i && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-surface-50 border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                        {products.map(p => (
                          <button key={p._id} type="button" onClick={() => selectProduct(i, p)} className="w-full text-left px-4 py-2.5 hover:bg-white/5 border-b border-white/5 last:border-0">
                            <p className="text-sm text-white">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.sku} · Total Stock: {p.totalStock}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-sm text-gray-400">Warehouse *</label>
                    <select className="input-field" value={item.warehouse} onChange={e => updateLineItem(i, 'warehouse', e.target.value)} required>
                      <option value="">Select warehouse</option>
                      {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm text-gray-400">Location *</label>
                    <select className="input-field" value={item.locationName} onChange={e => updateLineItem(i, 'locationName', e.target.value)} disabled={!item.warehouse} required>
                      <option value="">Select location</option>
                      {warehouses.find(w => w._id === item.warehouse)?.locations?.map(l => <option key={l._id} value={l.name}>{l.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Counted Quantity *" type="number" value={item.countedQuantity} onChange={e => updateLineItem(i, 'countedQuantity', e.target.value)} min={0} required />
                  <Input label="Reason" value={item.reason} onChange={e => updateLineItem(i, 'reason', e.target.value)} placeholder="Damage, expiry, found..." />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">Cancel</button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1">
            {submitting ? 'Creating...' : 'Create Adjustment'}
          </button>
        </div>
      </form>
    </PageWrapper>
  );
}
