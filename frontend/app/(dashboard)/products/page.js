'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { StockBadge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/Spinner';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { productAPI, categoryAPI, warehouseAPI } from '@/lib/api';
import { formatDate, getErrorMessage, debounce } from '@/lib/utils';
import { Search, Eye, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [warehouses, setWarehouses] = useState([]);

  const [form, setForm] = useState({ name: '', sku: '', category: '', unitOfMeasure: '', description: '', price: '', reorderPoint: '10', reorderQuantity: '50', initialStock: '0', warehouseId: '', locationName: '' });
  const [submitting, setSubmitting] = useState(false);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await productAPI.getAll({ page: 1, limit: 20, search, status: statusFilter, category: categoryFilter, ...params });
      setProducts(data.data.products);
      setPagination(data.data.pagination);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  }, [search, statusFilter, categoryFilter]);

  useEffect(() => {
    fetchProducts();
    categoryAPI.getAll().then(({ data }) => setCategories(data.data.categories));
    warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses));
  }, [fetchProducts]);

  const debouncedSearch = useCallback(debounce((val) => {
    setSearch(val);
    fetchProducts({ search: val });
  }, 400), [fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await productAPI.create({ ...form, price: Number(form.price), reorderPoint: Number(form.reorderPoint), reorderQuantity: Number(form.reorderQuantity), initialStock: Number(form.initialStock) });
      toast.success('Product created successfully!');
      setShowModal(false);
      setForm({ name: '', sku: '', category: '', unitOfMeasure: '', description: '', price: '', reorderPoint: '10', reorderQuantity: '50', initialStock: '0', warehouseId: '', locationName: '' });
      fetchProducts();
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSubmitting(false); }
  };

  const selectedWarehouse = warehouses.find(w => w._id === form.warehouseId);

  return (
    <PageWrapper title="Products" action={{ label: 'Add Product', onClick: () => setShowModal(true) }}>
      <div className="space-y-5">
        {/* Filters */}
        <div className="glass-card p-4">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input className="input-field pl-9" placeholder="Search by name, SKU, barcode..." onChange={e => debouncedSearch(e.target.value)} />
            </div>
            <select className="input-field w-40" value={statusFilter} onChange={e => { setStatusFilter(e.target.value); fetchProducts({ status: e.target.value }); }}>
              <option value="">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <select className="input-field w-44" value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); fetchProducts({ category: e.target.value }); }}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card">
          {loading ? <PageLoader /> : (
            <>
              <Table headers={['Product', 'SKU', 'Category', 'Stock', 'Reorder Point', 'Status', 'Actions']}>
                {products.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-12 text-gray-500 text-sm">No products found</td></tr>
                )}
                {products.map(p => (
                  <tr key={p._id} className="table-row">
                    <Td>
                      <div>
                        <p className="font-medium text-white">{p.name}</p>
                        {p.description && <p className="text-xs text-gray-500 truncate max-w-[200px]">{p.description}</p>}
                      </div>
                    </Td>
                    <Td><code className="text-xs bg-surface-100 px-2 py-0.5 rounded text-gray-300">{p.sku}</code></Td>
                    <Td>
                      {p.category && (
                        <span className="inline-flex items-center gap-1.5 text-xs">
                          <span className="w-2 h-2 rounded-full" style={{ background: p.category.color }} />
                          {p.category.name}
                        </span>
                      )}
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1.5">
                        {p.totalStock <= p.reorderPoint && p.totalStock > 0 && <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />}
                        <span className={p.totalStock === 0 ? 'text-red-400 font-medium' : p.totalStock <= p.reorderPoint ? 'text-yellow-400 font-medium' : 'text-white'}>
                          {p.totalStock.toLocaleString()} {p.unitOfMeasure}
                        </span>
                      </div>
                    </Td>
                    <Td className="text-gray-500">{p.reorderPoint} {p.unitOfMeasure}</Td>
                    <Td><StockBadge status={p.stockStatus} /></Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Link href={`/products/${p._id}`} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </Td>
                  </tr>
                ))}
              </Table>
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
                  <p className="text-xs text-gray-500">Total: {pagination.total} products</p>
                  <div className="flex gap-2">
                    <button disabled={pagination.page === 1} onClick={() => fetchProducts({ page: pagination.page - 1 })} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40">Prev</button>
                    <span className="text-xs text-gray-500 flex items-center">{pagination.page} / {pagination.totalPages}</span>
                    <button disabled={pagination.page === pagination.totalPages} onClick={() => fetchProducts({ page: pagination.page + 1 })} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40">Next</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Product Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Product" size="lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Product Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Steel Rod 10mm" required />
            <Input label="SKU / Code *" value={form.sku} onChange={e => setForm(p => ({ ...p, sku: e.target.value.toUpperCase() }))} placeholder="STL-ROD-10MM" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-400">Category *</label>
              <select className="input-field" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} required>
                <option value="">Select category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <Input label="Unit of Measure *" value={form.unitOfMeasure} onChange={e => setForm(p => ({ ...p, unitOfMeasure: e.target.value }))} placeholder="kg, pcs, liters" required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Price" type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="0.00" min="0" />
            <Input label="Reorder Point" type="number" value={form.reorderPoint} onChange={e => setForm(p => ({ ...p, reorderPoint: e.target.value }))} min="0" />
            <Input label="Reorder Qty" type="number" value={form.reorderQuantity} onChange={e => setForm(p => ({ ...p, reorderQuantity: e.target.value }))} min="0" />
          </div>
          <Input label="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Optional description..." />
          
          <div className="border-t border-white/5 pt-4">
            <p className="text-sm font-medium text-gray-400 mb-3">Initial Stock (Optional)</p>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Initial Quantity" type="number" value={form.initialStock} onChange={e => setForm(p => ({ ...p, initialStock: e.target.value }))} min="0" />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">Warehouse</label>
                <select className="input-field" value={form.warehouseId} onChange={e => setForm(p => ({ ...p, warehouseId: e.target.value, locationName: '' }))}>
                  <option value="">Select warehouse</option>
                  {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-400">Location</label>
                <select className="input-field" value={form.locationName} onChange={e => setForm(p => ({ ...p, locationName: e.target.value }))}>
                  <option value="">Select location</option>
                  {selectedWarehouse?.locations?.map(l => <option key={l._id} value={l.name}>{l.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
}
