'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { PageLoader } from '@/components/ui/Spinner';
import { ledgerAPI } from '@/lib/api';
import { formatDateTime, getMovementColor, getErrorMessage } from '@/lib/utils';
import { ArrowDown, ArrowUp, ArrowLeftRight, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const movementIcons = { IN: ArrowDown, OUT: ArrowUp, TRANSFER_IN: ArrowLeftRight, TRANSFER_OUT: ArrowLeftRight, ADJUSTMENT: Edit };

export default function LedgerPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 1 });
  const [filters, setFilters] = useState({ operationType: '', startDate: '', endDate: '', search: '' });

  const fetchLedger = async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await ledgerAPI.getAll({ page: 1, limit: 50, ...filters, ...params });
      setEntries(data.data.entries);
      setPagination(data.data.pagination);
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLedger(); }, []);

  return (
    <PageWrapper title="Stock Ledger">
      <div className="space-y-5">
        {/* Filters */}
        <div className="glass-card p-4">
          <div className="flex flex-wrap gap-3">
            <input className="input-field w-48" placeholder="Reference number..." value={filters.search} onChange={e => setFilters(p => ({ ...p, search: e.target.value }))} />
            <select className="input-field w-40" value={filters.operationType} onChange={e => setFilters(p => ({ ...p, operationType: e.target.value }))}>
              <option value="">All Types</option>
              <option value="RECEIPT">Receipt</option>
              <option value="DELIVERY">Delivery</option>
              <option value="TRANSFER">Transfer</option>
              <option value="ADJUSTMENT">Adjustment</option>
            </select>
            <input className="input-field w-40" type="date" value={filters.startDate} onChange={e => setFilters(p => ({ ...p, startDate: e.target.value }))} />
            <input className="input-field w-40" type="date" value={filters.endDate} onChange={e => setFilters(p => ({ ...p, endDate: e.target.value }))} />
            <button onClick={() => fetchLedger({ ...filters })} className="btn-primary text-sm py-2 px-4">Apply Filters</button>
            <button onClick={() => { setFilters({ operationType: '', startDate: '', endDate: '', search: '' }); fetchLedger({}); }} className="btn-secondary text-sm py-2 px-4">Reset</button>
          </div>
        </div>

        <div className="glass-card">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-white">Movement Log</h3>
            <span className="text-xs text-gray-500">{pagination.total} total entries</span>
          </div>
          {loading ? <PageLoader /> : (
            <Table headers={['Reference', 'Product', 'Type', 'Movement', 'Before', 'Change', 'After', 'Warehouse', 'By', 'Date']}>
              {entries.length === 0 && <tr><td colSpan={10} className="text-center py-12 text-gray-500 text-sm">No ledger entries yet</td></tr>}
              {entries.map(e => {
                const Icon = movementIcons[e.movementType] || Edit;
                const color = getMovementColor(e.movementType);
                const sign = e.quantityChanged >= 0 ? '+' : '';
                return (
                  <tr key={e._id} className="table-row">
                    <Td><code className="text-xs text-brand-400 font-mono">{e.referenceNumber}</code></Td>
                    <Td>
                      <div>
                        <p className="text-white font-medium text-sm">{e.product?.name}</p>
                        <p className="text-xs text-gray-500">{e.product?.sku}</p>
                      </div>
                    </Td>
                    <Td><span className="text-xs bg-surface-100 px-2 py-0.5 rounded text-gray-400">{e.operationType}</span></Td>
                    <Td>
                      <div className={`flex items-center gap-1.5 ${color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-xs">{e.movementType.replace('_', ' ')}</span>
                      </div>
                    </Td>
                    <Td className="text-gray-500 tabular-nums">{e.quantityBefore.toLocaleString()}</Td>
                    <Td className={`font-bold tabular-nums ${color}`}>{sign}{e.quantityChanged.toLocaleString()}</Td>
                    <Td className="text-white tabular-nums font-medium">{e.quantityAfter.toLocaleString()}</Td>
                    <Td>
                      <div>
                        <p className="text-white text-sm">{e.warehouse?.name}</p>
                        <p className="text-xs text-gray-500">{e.locationName}</p>
                      </div>
                    </Td>
                    <Td>{e.performedBy?.name}</Td>
                    <Td className="text-gray-500 text-xs">{formatDateTime(e.createdAt)}</Td>
                  </tr>
                );
              })}
            </Table>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
