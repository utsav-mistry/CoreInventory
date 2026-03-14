'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { warehouseAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { Warehouse, MapPin, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', address: '', locations: [{ name: '', code: '', description: '' }] });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    warehouseAPI.getAll().then(({ data }) => setWarehouses(data.data.warehouses)).catch(e => toast.error(getErrorMessage(e))).finally(() => setLoading(false));
  }, []);

  const addLocation = () => setForm(p => ({ ...p, locations: [...p.locations, { name: '', code: '', description: '' }] }));
  const updateLocation = (i, field, val) => setForm(p => ({ ...p, locations: p.locations.map((l, idx) => idx === i ? { ...l, [field]: val } : l) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await warehouseAPI.create(form);
      setWarehouses(prev => [...prev, data.data.warehouse]);
      toast.success('Warehouse created!');
      setShowModal(false);
      setForm({ name: '', code: '', address: '', locations: [{ name: '', code: '', description: '' }] });
    } catch (err) { toast.error(getErrorMessage(err)); }
    finally { setSubmitting(false); }
  };

  return (
    <PageWrapper title="Warehouses" action={{ label: 'Add Warehouse', onClick: () => setShowModal(true) }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {warehouses.length === 0 && !loading && (
          <div className="col-span-3 text-center py-12 text-gray-500 text-sm glass-card">
            No warehouses yet. Create your first one!
          </div>
        )}
        {warehouses.map(w => (
          <div key={w._id} className="glass-card p-5 hover:border-white/10 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-brand-500/10 border border-brand-500/20 rounded-lg">
                <Warehouse className="w-5 h-5 text-brand-400" />
              </div>
              <code className="text-xs bg-surface-100 px-2 py-1 rounded text-gray-400">{w.code}</code>
            </div>
            <h3 className="font-semibold text-white mb-1">{w.name}</h3>
            {w.address && <p className="text-xs text-gray-500 flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" />{w.address}</p>}
            <div className="border-t border-white/5 pt-3 mt-3">
              <p className="text-xs text-gray-500 mb-2">Locations ({w.locations?.length || 0})</p>
              <div className="flex flex-wrap gap-1.5">
                {w.locations?.map(l => (
                  <span key={l._id} className="text-xs bg-surface-100 border border-white/5 px-2 py-0.5 rounded text-gray-400">{l.name}</span>
                ))}
                {(!w.locations || w.locations.length === 0) && <span className="text-xs text-gray-600">No locations configured</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Warehouse" size="md">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Warehouse Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Main Warehouse" required />
            <Input label="Code *" value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))} placeholder="WH-MAIN" required />
          </div>
          <Input label="Address" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Street, City, State" />
          
          <div className="border-t border-white/5 pt-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-400">Locations</label>
              <button type="button" onClick={addLocation} className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1"><Plus className="w-3 h-3" />Add</button>
            </div>
            <div className="space-y-2">
              {form.locations.map((l, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-surface-100 rounded-lg">
                  <Input label="Name" value={l.name} onChange={e => updateLocation(i, 'name', e.target.value)} placeholder="Rack A" />
                  <Input label="Code" value={l.code} onChange={e => updateLocation(i, 'code', e.target.value.toUpperCase())} placeholder="RACK-A" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">{submitting ? 'Creating...' : 'Create Warehouse'}</button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
}
