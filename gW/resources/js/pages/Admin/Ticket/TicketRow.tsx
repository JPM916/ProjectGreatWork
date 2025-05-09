import React from 'react';
import { TicketItem } from '@/components/TicketDetailsModal';
import { getCategoryBadgeColor, getStatusClass } from '@/Utils/ticketUtils';

interface TicketRowsProps {
  tickets: TicketItem[];
  openModal: (ticket: TicketItem) => void;
}

const TicketRows: React.FC<TicketRowsProps> = ({ tickets, openModal }) => (
  <div className="divide-y divide-gray-100">
    {tickets.map(ticket => (
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
        <div>
          <button
            onClick={() => openModal(ticket)}
            className="text-blue-600 hover:underline text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    ))}
    {tickets.length === 0 && (
      <div className="text-center py-4 col-span-8 text-gray-500">No tickets found.</div>
    )}
  </div>
);

export default TicketRows;
