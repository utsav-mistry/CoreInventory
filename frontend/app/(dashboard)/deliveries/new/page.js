'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import Input from '@/components/ui/Input';
import { deliveryAPI, productAPI, warehouseAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import { Plus, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NewDeliveryPage() {
  const router = useRouter();
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ customer: '', warehouseId: '', locationName: '', scheduledDate: '', shippingAddress: '', note: '' });
  const [lineItems, setLineItems] = useState([{ product: '', quantity: 1, unitOfMeasure: '' }]);

  useEffect(() => { warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses)); }, []);
  useEffect(() => {
    if (productSearch.length >= 1) productAPI.getAll({ search: productSearch, limit: 10 }).then(({ data }) => setProducts(data.data.products));
  }, [productSearch]);

  const selectedWarehouse = warehouses.find(w => w._id === form.warehouseId);
  const addLineItem = () => setLineItems(p => [...p, { product: '', quantity: 1, unitOfMeasure: '' }]);
  const removeLineItem = (i) => setLineItems(p => p.filter((_, idx) => idx !== i));
  const updateLineItem = (i, field, value) => setLineItems(p => p.map((item, idx) => idx === i ? { ...item, [field]: value } : item));
  const selectProduct = (i, product) => {
    setLineItems(p => p.map((item, idx) => idx === i ? { ...item, product: product._id, unitOfMeasure: product.unitOfMeasure, _productName: product.name, _productSku: product.sku, _availableStock: product.totalStock } : item));
    setProductSearch(''); setProducts([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customer || !form.warehouseId || !form.locationName) return toast.error('Please fill all required fields');
    if (lineItems.some(l => !l.product || l.quantity < 1)) return toast.error('All line items must have a product and quantity');
    setSubmitting(true);
    try {
      await deliveryAPI.create({ customer: form.customer, warehouse: form.warehouseId, locationName: form.locationName, scheduledDate: form.scheduledDate || undefined, shippingAddress: form.shippingAddress, note: form.note, lineItems: lineItems.map(l => ({ product: l.product, quantity: Number(l.quantity), unitOfMeasure: l.unitOfMeasure })) });
      toast.success('Delivery order created!');
      router.push('/deliveries');
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSubmitting(false); }
  };

  return (
    <PageWrapper title="New Delivery Order">
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-semibold text-white">Delivery Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Customer *" value={form.customer} onChange={e => setForm(p => ({ ...p, customer: e.target.value }))} placeholder="Customer name" required />
            <Input label="Scheduled Date" type="date" value={form.scheduledDate} onChange={e => setForm(p => ({ ...p, scheduledDate: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Source Warehouse *</label>
              <select className="input-field" value={form.warehouseId} onChange={e => setForm(p => ({ ...p, warehouseId: e.target.value, locationName: '' }))} required>
                <option value="">Select warehouse</option>
                {warehouses.map(w => <option key={w._id} value={w._id}>{w.name} ({w.code})</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Location *</label>
              <select className="input-field" value={form.locationName} onChange={e => setForm(p => ({ ...p, locationName: e.target.value }))} required disabled={!form.warehouseId}>
                <option value="">Select location</option>
                {selectedWarehouse?.locations?.map(l => <option key={l._id} value={l.name}>{l.name} ({l.code})</option>)}
              </select>
            </div>
          </div>
          <Input label="Shipping Address" value={form.shippingAddress} onChange={e => setForm(p => ({ ...p, shippingAddress: e.target.value }))} placeholder="Customer shipping address" />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-400">Note</label>
            <textarea className="input-field resize-none" rows={2} value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="Optional note..." />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Products to Deliver</h2>
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
                    <button type="button" onClick={() => removeLineItem(i)} className="text-gray-600 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {item._productName ? (
                  <div className="flex items-center justify-between bg-surface-200 rounded-lg px-3 py-2">
                    <div>
                      <p className="text-sm text-white font-medium">{item._productName}</p>
                      <p className="text-xs text-gray-500">{item._productSku} · Available: {item._availableStock}</p>
                    </div>
                    <button type="button" onClick={() => setLineItems(p => p.map((l, idx) => idx === i ? { product: '', quantity: l.quantity, unitOfMeasure: '' } : l))} className="text-xs text-gray-500 hover:text-white">Change</button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input className="input-field pl-9" placeholder="Search product..." value={productSearch} onChange={e => setProductSearch(e.target.value)} />
                    {products.length > 0 && (
                      <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-surface-50 border border-white/10 rounded-lg shadow-2xl overflow-hidden">
                        {products.map(p => (
                          <button key={p._id} type="button" onClick={() => selectProduct(i, p)} className="w-full text-left px-4 py-2.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                            <p className="text-sm text-white">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.sku} · Available: {p.totalStock} {p.unitOfMeasure}</p>
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
            {submitting ? 'Creating...' : 'Create Delivery Order'}
          </button>
        </div>
      </form>
    </PageWrapper>
  );
}
