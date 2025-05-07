import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export interface TicketItem {
  id: number;
  name: string;
  concern: string;
  ticket_number: string;
  date_requested: string;
  approved_by: string;
  last_updated: string;
  status: string;
  category: string;
}

const statuses = ['All', 'Pending', 'Ongoing', 'Archived/Delivered'];
const headers = ['Name', 'Category', 'Ticket No.', 'Approved By', 'Date Requested', 'Last Updated', 'Status', 'Action'];

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    'pending': 'bg-red-100 text-red-700',
    'ongoing': 'bg-green-100 text-green-700',
    'archived/delivered': 'bg-blue-100 text-blue-700',
  };
  return `${map[status.toLowerCase()] || 'bg-gray-100 text-gray-600'} text-xs px-3 py-1 rounded-full font-semibold`;
};

const getCategoryBadgeColor = (category: string) => {
  const base = 'text-xs font-medium px-3 py-1 rounded-lg whitespace-nowrap';
  switch (category?.toLowerCase()) {
    case 'technical': return `${base} bg-green-100 text-green-700`;
    case 'billing': return `${base} bg-blue-100 text-blue-700`;
    case 'support': return `${base} bg-yellow-100 text-yellow-700`;
    case 'bug': return `${base} bg-red-100 text-red-700`;
    default: return `${base} bg-gray-100 text-gray-700`;
  }
};

export default function TicketsPage() {
  const { props } = usePage<{ tickets: TicketItem[] }>();
  const tickets = props.tickets || [];

  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredTickets = tickets.filter(ticket =>
    (activeStatus === 'all' || ticket.status.toLowerCase().trim() === activeStatus.toLowerCase()) &&
    ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginated = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  return (
    <AppLayout>
      <Head title="Tickets" />
      <div className="p-4">
        <div className="bg-white p-2 rounded-2xl shadow w-full">
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
            </div>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-8 gap-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
            {headers.map(header => <div key={header}>{header}</div>)}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {paginated.map(ticket => (
              <div key={ticket.id} className="grid grid-cols-8 gap-4 py-4 text-sm items-center">
                <div>
                  <div className="font-semibold text-gray-900">{ticket.name}</div>
                  <div className="text-xs text-gray-500">{ticket.concern}</div>
                </div>
                <div><span className={getCategoryBadgeColor(ticket.category)}>{ticket.category}</span></div>
                <div>{ticket.ticket_number}</div>
                <div>{ticket.approved_by}</div>
                <div>{ticket.date_requested}</div>
                <div>{ticket.last_updated}</div>
                <div><span className={getStatusClass(ticket.status)}>{ticket.status}</span></div>
                <div><button className="text-blue-600 hover:underline text-sm">View Details</button></div>
              </div>
            ))}
            {paginated.length === 0 && (
              <div className="text-center py-4 col-span-8 text-gray-500">No tickets found.</div>
            )}
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
