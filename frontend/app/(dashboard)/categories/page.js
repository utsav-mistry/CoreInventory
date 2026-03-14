'use client';
import { useState, useEffect } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import { Table, Td } from '@/components/ui/Table';
import { PageLoader } from '@/components/ui/Spinner';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import { categoryAPI } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import { Plus, Edit2, LayoutGrid } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', color: '#6366f1' });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await categoryAPI.getAll();
      setCategories(data.data.categories);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setForm({ name: category.name, description: category.description || '', color: category.color });
    } else {
      setEditingCategory(null);
      setForm({ name: '', description: '', color: '#6366f1' });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingCategory) {
        await categoryAPI.update(editingCategory._id, form);
        toast.success('Category updated!');
      } else {
        await categoryAPI.create(form);
        toast.success('Category created!');
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper title="Product Categories" action={{ label: 'Add Category', onClick: () => handleOpenModal() }}>
      <div className="space-y-5">
        <div className="glass-card">
          {loading ? <PageLoader /> : (
            <Table headers={['Preview', 'Category Name', 'Description', 'Action']}>
              {categories.length === 0 && (
                <tr><td colSpan={4} className="text-center py-12 text-gray-500 text-sm">No categories found</td></tr>
              )}
              {categories.map(c => (
                <tr key={c._id} className="table-row">
                  <Td>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10" style={{ backgroundColor: `${c.color}20` }}>
                      <LayoutGrid className="w-4 h-4" style={{ color: c.color }} />
                    </div>
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="font-medium text-white">{c.name}</span>
                    </div>
                  </Td>
                  <Td className="text-gray-500 max-w-xs truncate">{c.description || '—'}</Td>
                  <Td>
                    <button 
                      onClick={() => handleOpenModal(c)}
                      className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingCategory ? 'Edit Category' : 'Add Category'} size="sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input 
            label="Category Name *" 
            value={form.name} 
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))} 
            placeholder="E.g. Raw Materials" 
            required 
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-400">Description</label>
            <textarea 
              className="input-field resize-none" 
              rows={3} 
              value={form.description} 
              onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              placeholder="Briefly describe the category..."
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-400">Brand Color</label>
            <div className="flex items-center gap-3">
              <input 
                type="color" 
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                value={form.color} 
                onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
              />
              <code className="text-xs text-gray-500 uppercase">{form.color}</code>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={submitting} className="btn-primary flex-1">
              {submitting ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
}
