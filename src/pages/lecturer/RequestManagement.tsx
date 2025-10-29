import { useState } from 'react';
import { DashboardLayout } from '../../components/templates';
import { Card } from '../../components/molecules';
import { Badge } from '../../components/atoms';

interface Request {
  id: string;
  studentName: string;
  studentId: string;
  type: 'late' | 'absence';
  classId: string;
  className: string;
  reason: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents?: string[];
}

export const RequestManagement = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: '1',
      studentName: 'John Doe',
      studentId: 'STU001',
      type: 'late',
      classId: '1',
      className: 'Web Development',
      reason: 'Traffic jam on the way to campus',
      requestDate: '2024-10-29 08:30',
      status: 'pending',
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      studentId: 'STU002',
      type: 'absence',
      classId: '2',
      className: 'Database Systems',
      reason: 'Medical appointment - Doctor visit',
      requestDate: '2024-10-28 14:00',
      status: 'pending',
      documents: ['medical-certificate.pdf'],
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      studentId: 'STU003',
      type: 'late',
      classId: '1',
      className: 'Web Development',
      reason: 'Family emergency',
      requestDate: '2024-10-27 09:15',
      status: 'approved',
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const handleRequest = (requestId: string, action: 'approve' | 'reject') => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId
          ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' }
          : req
      )
    );
  };

  const filteredRequests = requests.filter(req => 
    selectedFilter === 'all' || req.status === selectedFilter
  );

  const pendingCount = requests.filter(req => req.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Request Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Review and manage student attendance requests
            </p>
          </div>
          {pendingCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="warning" size="lg">
                {pendingCount} Pending Request{pendingCount !== 1 ? 's' : ''}
              </Badge>
            </div>
          )}
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                  selectedFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                }`}
              >
                {filter} ({filter === 'all' ? requests.length : requests.filter(r => r.status === filter).length})
              </button>
            ))}
          </div>
        </Card>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <Card>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No {selectedFilter !== 'all' ? selectedFilter : ''} requests found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedFilter === 'all' 
                    ? 'No student requests at the moment'
                    : `No ${selectedFilter} requests to display`
                  }
                </p>
              </div>
            </Card>
          ) : (
            filteredRequests.map((request) => (
              <Card key={request.id}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request.studentName}
                      </h3>
                      <Badge variant="default">{request.studentId}</Badge>
                      <Badge variant={request.type === 'late' ? 'warning' : 'info'}>
                        {request.type === 'late' ? 'Late Arrival' : 'Absence'}
                      </Badge>
                      <Badge
                        variant={
                          request.status === 'approved' ? 'success' :
                          request.status === 'rejected' ? 'error' : 'warning'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Class:</strong> {request.className}</p>
                      <p><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleString()}</p>
                      <p><strong>Reason:</strong> {request.reason}</p>
                      {request.documents && request.documents.length > 0 && (
                        <div>
                          <strong>Documents:</strong>
                          <div className="flex gap-2 mt-1">
                            {request.documents.map((doc, index) => (
                              <button
                                key={index}
                                className="text-primary-600 hover:text-primary-700 dark:text-primary-400 underline"
                              >
                                📎 {doc}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleRequest(request.id, 'approve')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRequest(request.id, 'reject')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Bulk Actions for Pending Requests */}
        {pendingCount > 0 && (
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Bulk Actions
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const pendingIds = requests.filter(r => r.status === 'pending').map(r => r.id);
                    pendingIds.forEach(id => handleRequest(id, 'approve'));
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve All Pending
                </button>
                <button
                  onClick={() => {
                    const pendingIds = requests.filter(r => r.status === 'pending').map(r => r.id);
                    pendingIds.forEach(id => handleRequest(id, 'reject'));
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject All Pending
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};