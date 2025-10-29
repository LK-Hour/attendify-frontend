import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';

interface Campus {
  id: string;
  name: string;
  address: string;
  buildings: number;
  students: number;
}

export const CampusManagement = () => {
  const [campuses, setCampuses] = useState<Campus[]>([
    {
      id: '1',
      name: 'Main Campus',
      address: 'Phnom Penh, Cambodia',
      buildings: 5,
      students: 1234,
    },
    {
      id: '2',
      name: 'North Campus',
      address: 'Siem Reap, Cambodia',
      buildings: 3,
      students: 567,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setCampuses(
        campuses.map((c) =>
          c.id === editingId ? { ...c, ...formData } : c
        )
      );
      setEditingId(null);
    } else {
      const newCampus: Campus = {
        id: String(Date.now()),
        ...formData,
        buildings: 0,
        students: 0,
      };
      setCampuses([...campuses, newCampus]);
    }
    setFormData({ name: '', address: '' });
    setShowForm(false);
  };

  const handleEdit = (campus: Campus) => {
    setFormData({ name: campus.name, address: campus.address });
    setEditingId(campus.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this campus?')) {
      setCampuses(campuses.filter((c) => c.id !== id));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Campus Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage campuses, buildings, and rooms
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ name: '', address: '' });
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            + Add Campus
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <Card>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingId ? 'Edit Campus' : 'New Campus'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Campus Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ name: '', address: '' });
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* Campus List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campuses.map((campus) => (
            <Card key={campus.id} hover>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {campus.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      📍 {campus.address}
                    </p>
                  </div>
                  <Badge variant="info">{campus.students} Students</Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>🏢 {campus.buildings} Buildings</span>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => handleEdit(campus)}
                    className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900 transition-colors text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(campus.id)}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
