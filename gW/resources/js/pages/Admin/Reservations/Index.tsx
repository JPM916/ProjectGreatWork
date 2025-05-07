import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Filter } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

export interface ReservationItem {
  id: number;
  name: string;
  category: string;
  email: string;
  contact_number: string;
  start_date: string;
  end_date: string;
  location: string;
  status: string;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Reservations', href: '/reservations' }];
const statuses = ['All', 'Upcoming', 'Ongoing', 'Archived/Delivered'];
const headers = ['Name', 'Category', 'Email', 'Contact No.', 'Start Date', 'End Date', 'Location', 'Status'];

const getCategoryClass = (category: string) => {
  const map: Record<string, string> = {
    'co-working': 'bg-cyan-100 text-cyan-700',
    'virtual': 'bg-blue-100 text-blue-700',
    'private': 'bg-indigo-100 text-indigo-700',
    'meeting': 'bg-purple-100 text-purple-700',
  };
  return `${map[category.toLowerCase()] || 'bg-gray-100 text-gray-700'} text-xs px-3 py-1 rounded-full font-semibold`;
};

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    'upcoming': 'bg-yellow-100 text-yellow-700',
    'ongoing': 'bg-green-100 text-green-700',
    'archived/delivered': 'bg-gray-200 text-gray-700',
  };
  return `${map[status.toLowerCase()] || 'bg-gray-100 text-gray-600'} text-xs px-3 py-1 rounded-full font-semibold`;
};

export default function ReservationsPage() {
  const { props } = usePage<{ reservations: ReservationItem[] }>();
  const reservations = props.reservations || [];

  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = reservations.filter(res =>
    (activeStatus === 'all' || res.status.toLowerCase().trim() === activeStatus) &&
    res.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reservations" />
      <div className="p-4">
        <div className="bg-white p-2rounded-2xl shadow p-2 w-full">
          {/* Tabs + Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex gap-4">
              {statuses.map(status => {
                const key = status.toLowerCase();
                return (
                  <button
                    key={status}
                    onClick={() => {
                      setActiveStatus(key);
                      setCurrentPage(1);
                    }}
                    className={`text-sm font-semibold pb-2 ${
                      activeStatus === key ? 'text-black border-b-2 border-black' : 'text-gray-400'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
              <input
                type="text"
                placeholder="🔍 Search"
                className="border border-gray-500 rounded-lg px-4 py-2 pt-1 text-sm w-64 bg-gray-50"
                value={searchQuery}
                onChange={e => { 
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <button className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
                <Filter size={16} />
              </button>
            </div>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-8 gap-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
            {headers.map(header => <div key={header}>{header}</div>)}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {paginated.map(res => (
              <div key={res.id} className="grid grid-cols-8 gap-4 py-4 text-sm items-center">
                <div>{res.name}</div>
                <div><span className={getCategoryClass(res.category)}>{res.category}</span></div>
                <div>{res.email}</div>
                <div>{res.contact_number}</div>
                <div>{res.start_date}</div>
                <div>{res.end_date}</div>
                <div>{res.location}</div>
                <div><span className={getStatusClass(res.status)}>{res.status}</span></div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-6 gap-2 text-sm">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:text-gray-400"
            >
              &lt; Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-black text-white' : ''}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:text-gray-400"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
  