'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import Input from '@/components/ui/Input';
import { transferAPI, productAPI, warehouseAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import { Plus, Trash2, Search, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewTransferPage() {
  const router = useRouter();
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [activeItemIdx, setActiveItemIdx] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ fromWarehouseId: '', fromLocation: '', toWarehouseId: '', toLocation: '', scheduledDate: '', reason: '', note: '' });
  const [lineItems, setLineItems] = useState([{ product: '', quantity: 1, unitOfMeasure: '' }]);

  useEffect(() => { warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses)); }, []);
  useEffect(() => {
    if (productSearch.length >= 1) productAPI.getAll({ search: productSearch, limit: 10 }).then(({ data }) => setProducts(data.data.products));
    else setProducts([]);
  }, [productSearch]);

  const fromWarehouse = warehouses.find(w => w._id === form.fromWarehouseId);
  const toWarehouse = warehouses.find(w => w._id === form.toWarehouseId);
  const addLineItem = () => setLineItems(p => [...p, { product: '', quantity: 1, unitOfMeasure: '' }]);
  const removeLineItem = (i) => setLineItems(p => p.filter((_, idx) => idx !== i));
  const updateLineItem = (i, field, value) => setLineItems(p => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  const selectProduct = (i, product) => {
    setLineItems(p => p.map((item, idx) => idx === i ? { ...item, product: product._id, unitOfMeasure: product.unitOfMeasure, _productName: product.name, _productSku: product.sku } : item));
    setProductSearch(''); setProducts([]); setActiveItemIdx(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fromWarehouseId || !form.fromLocation || !form.toWarehouseId || !form.toLocation) return toast.error('Please select source and destination');
    if (lineItems.some(l => !l.product || l.quantity < 1)) return toast.error('All line items must have a product and quantity');
    setSubmitting(true);
    try {
      await transferAPI.create({ fromWarehouse: form.fromWarehouseId, fromLocation: form.fromLocation, toWarehouse: form.toWarehouseId, toLocation: form.toLocation, scheduledDate: form.scheduledDate || undefined, reason: form.reason, note: form.note, lineItems: lineItems.map(l => ({ product: l.product, quantity: Number(l.quantity), unitOfMeasure: l.unitOfMeasure })) });
      toast.success('Transfer created!');
      router.push('/transfers');
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSubmitting(false); }
  };

  return (
    <PageWrapper title="New Internal Transfer">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-white">Transfer Route</h2>
          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
            {/* From */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">From</p>
              <div className="space-y-1.5">
                <label className="block text-sm text-gray-400">Warehouse *</label>
                <select className="input-field" value={form.fromWarehouseId} onChange={e => setForm(p => ({ ...p, fromWarehouseId: e.target.value, fromLocation: '' }))} required>
                  <option value="">Select source</option>
                  {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm text-gray-400">Location *</label>
                <select className="input-field" value={form.fromLocation} onChange={e => setForm(p => ({ ...p, fromLocation: e.target.value }))} disabled={!form.fromWarehouseId} required>
                  <option value="">Select location</option>
                  {fromWarehouse?.locations?.map(l => <option key={l._id} value={l.name}>{l.name}</option>)}
                </select>
              </div>
            </div>
            <div className="pb-2 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-gray-600" />
            </div>
            {/* To */}
            <div className="space-y-3">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">To</p>
              <div className="space-y-1.5">
                <label className="block text-sm text-gray-400">Warehouse *</label>
                <select className="input-field" value={form.toWarehouseId} onChange={e => setForm(p => ({ ...p, toWarehouseId: e.target.value, toLocation: '' }))} required>
                  <option value="">Select destination</option>
                  {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm text-gray-400">Location *</label>
                <select className="input-field" value={form.toLocation} onChange={e => setForm(p => ({ ...p, toLocation: e.target.value }))} disabled={!form.toWarehouseId} required>
                  <option value="">Select location</option>
                  {toWarehouse?.locations?.map(l => <option key={l._id} value={l.name}>{l.name}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Scheduled Date" type="date" value={form.scheduledDate} onChange={e => setForm(p => ({ ...p, scheduledDate: e.target.value }))} />
            <Input label="Reason" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} placeholder="E.g. Rebalancing, overflow..." />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Products to Transfer</h2>
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
                    <button type="button" onClick={() => setLineItems(p => p.map((l, idx) => idx === i ? { product: '', quantity: l.quantity, unitOfMeasure: '' } : l))} className="text-xs text-gray-500 hover:text-white">Change</button>
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
                            <p className="text-xs text-gray-500">{p.sku}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Quantity *" type="number" value={item.quantity} onChange={e => updateLineItem(i, 'quantity', e.target.value)} min={1} required />
                  <Input label="Unit of Measure" value={item.unitOfMeasure} onChange={e => updateLineItem(i, 'unitOfMeasure', e.target.value)} placeholder="kg, pcs..." />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary flex-1">Cancel</button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1">
            {submitting ? 'Creating...' : 'Create Transfer'}
          </button>
        </div>
      </form>
    </PageWrapper>
  );
}
