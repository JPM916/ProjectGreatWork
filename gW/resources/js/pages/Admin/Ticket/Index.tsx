// TicketsPage.tsx
import React, { useState, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import TicketDetailsModal, { TicketItem } from '@/components/TicketDetailsModal';
import TicketRows from './TicketRow';
import { STATUSES, HEADERS } from '@/Constant/ticketConstants';
import { getStatusClass } from '@/Utils/ticketUtils';

export default function TicketsPage() {
  const { props } = usePage<{ tickets: TicketItem[], flash?: { success?: string } }>();
  const tickets = props.tickets || [];

  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const itemsPerPage = 10;
  const filteredTickets = tickets.filter(ticket =>
    (activeStatus === 'all' || ticket.status.toLowerCase().trim() === activeStatus.toLowerCase()) &&
    ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginated = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const openModal = (ticket: TicketItem) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };
  const onUpdateStatus = (ticketId: number, newStatus: string) => {
    router.patch(`/admin/tickets/${ticketId}/status`, { status: newStatus }, {
      preserveScroll: true,
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };
  useEffect(() => {
    if (props.flash?.success) {
      alert(props.flash.success);
    }
  }, [props.flash]);
  return (
    <AppLayout>
      <Head title="Tickets" />
      <div className="p-4">
        <div className="bg-white p-2 rounded-2xl shadow w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex gap-4">
              {STATUSES.map(status => {
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
          <div className="grid grid-cols-8 gap-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
            {HEADERS.map(header => <div key={header}>{header}</div>)}
          </div>
          <TicketRows tickets={paginated} openModal={openModal} />
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
      <TicketDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
        onUpdateStatus={onUpdateStatus}
      />
    </AppLayout>
  );
}
