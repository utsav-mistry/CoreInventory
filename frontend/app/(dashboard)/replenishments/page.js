'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { PageLoader } from '@/components/ui/Spinner';
import { productAPI, warehouseAPI, categoryAPI } from '@/lib/api';
import { AlertTriangle, ArrowDownToLine, Filter, Box } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ReplenishmentPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ warehouse: '', category: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await productAPI.getLowStock(filters);
      setItems(data.data.products);
    } catch (err) {
      toast.error('Failed to load replenishment data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  useEffect(() => {
    warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses));
    categoryAPI.getAll().then(({ data }) => setCategories(data.data.categories));
  }, []);

  return (
    <PageWrapper title="Stock Replenishment">
      <div className="space-y-6">
        {/* Helper Banner */}
        <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-semibold text-white">Smart Inventory Balancing</h4>
            <p className="text-gray-400 mt-1">This list identifies products that have fallen below their <strong>Reorder Point</strong>. Suggested order quantities are calculated based on your reorder rules.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-gray-500 mr-2">
            <Filter className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Refine View</span>
          </div>
          <select 
            className="input-field w-auto py-2 pr-8 text-sm"
            value={filters.warehouse}
            onChange={(e) => setFilters(p => ({ ...p, warehouse: e.target.value }))}
          >
            <option value="">All Warehouses</option>
            {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
          </select>
          <select 
            className="input-field w-auto py-2 pr-8 text-sm"
            value={filters.category}
            onChange={(e) => setFilters(p => ({ ...p, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        {/* Inventory List */}
        <div className="glass-card">
          {loading ? <PageLoader /> : (
            <Table headers={['Product', 'Category', 'Stock Status', 'Min Level', 'Suggestion', 'Actions']}>
              {items.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-gray-500 text-sm">All products are healthy. No replenishment needed!</td></tr>
              )}
              {items.map(item => (
                <tr key={item._id} className="table-row">
                  <Td>
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-xs text-gray-500 font-mono">{item.sku}</p>
                    </div>
                  </Td>
                  <Td>
                    <span className="text-xs bg-white/5 px-2 py-0.5 rounded text-gray-400 border border-white/5">{item.category?.name}</span>
                  </Td>
                  <Td>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-red-400">{item.currentStock} {item.unitOfMeasure}</span>
                      <span className="text-[10px] uppercase text-gray-600 font-bold">In Local Stock</span>
                    </div>
                  </Td>
                  <Td className="text-gray-500">{item.reorderPoint} {item.unitOfMeasure}</Td>
                  <Td>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-green-400">+{item.suggestedOrder} {item.unitOfMeasure}</span>
                      <span className="text-[10px] uppercase text-gray-600 font-bold">Auto Suggestion</span>
                    </div>
                  </Td>
                  <Td>
                    <button 
                      onClick={() => router.push(`/receipts/new?product=${item._id}&qty=${item.suggestedOrder}`)}
                      className="btn-secondary py-1.5 px-3 flex items-center gap-2 text-xs hover:border-brand-500/30 hover:text-brand-400 transition-all"
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5" />
                      Draft Receipt
                    </button>
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
