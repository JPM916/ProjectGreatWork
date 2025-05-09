import { useState, useEffect } from 'react';
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
  location: string;
  created_at: string;
}
interface Props {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketItem | null;
  onUpdateStatus: (ticketId: number, status: string) => void;
}
export default function TicketDetailsModal({ isOpen, onClose, ticket, onUpdateStatus }: Props) {
  const [status, setStatus] = useState(ticket?.status || '');
  useEffect(() => {
    if (ticket) setStatus(ticket.status);
  }, [ticket]);
  if (!isOpen || !ticket) return null;
  const handleAccept = () => {
    setStatus('ongoing');
    onUpdateStatus(ticket.id, 'ongoing');
  };
  const handleDecline = () => {
    setStatus('archived/delivered');
    onUpdateStatus(ticket.id, 'archived/delivered');
  };
  const handleMarkAsCompleted = () => {
    setStatus('archived/delivered');
    onUpdateStatus(ticket.id, 'archived/delivered');
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-1">Request for Technical Support</h2>
        <div className="text-xs text-gray-500 mb-4 space-x-2">
          <span className="px-2 py-0.5 bg-gray-200 rounded">#{ticket.ticket_number}</span>
          <span className="px-2 py-0.5 bg-gray-200 rounded">{ticket.location}</span>
          <span className="px-2 py-0.5 bg-gray-200 rounded capitalize">{ticket.category}</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="rounded-full w-10 h-10"
          />
          <div className="text-sm">
            <p className="font-semibold">{ticket.name}</p>
            <p className="text-gray-500">
              {new Date(ticket.created_at).toLocaleString(undefined, {
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
        <div className="text-sm text-gray-700 space-y-4 mb-6">
          <p>Dear GreatWorks Team,</p>
          <p className="whitespace-pre-line">{ticket.concern}</p>
          <p>Regards,</p>
          <p>{ticket.name}</p>
        </div>
        <div className="flex justify-end gap-4">
          {status === 'pending' && (
            <>
              <button
                onClick={handleAccept}
                className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-full"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-full"
              >
                Decline
              </button>
            </>
          )}
          {status === 'ongoing' && (
            <button
              onClick={handleMarkAsCompleted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full"
            >
              Mark as Completed
            </button>
          )}
          {status === 'archived/delivered' && (
            <span className="text-sm text-gray-500 italic">Ticket is completed.</span>
          )}
        </div>
      </div>
    </div>
  );
}
