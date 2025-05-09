import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { ReservationItem } from '@/Constant/reservationConstants';
import ReservationTable from './ReservationRow';
import { statuses } from '@/Constant/reservationConstants';
import SearchAndFilter from '@/components/SearchandFilter';


const breadcrumbs: BreadcrumbItem[] = [{ title: 'Reservations', href: '/reservations' }];
const itemsPerPage = 8;

export default function ReservationsPage() {
  const { props } = usePage<{ reservations: ReservationItem[] }>();
  const reservations = props.reservations || [];

  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = reservations.filter(res =>
    (activeStatus === 'all' || res.status.toLowerCase().trim() === activeStatus) &&
    res.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reservations" />
      <div className="p-4 bg-white rounded-2xl shadow w-full">
     
      <SearchAndFilter
  statuses={statuses}
  activeStatus={activeStatus}
  searchQuery={searchQuery}
  onStatusChange={(status) => {
    setActiveStatus(status);
    setCurrentPage(1);
  }}
  onSearchChange={(query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }}
/>

        <ReservationTable data={paginated} />

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
    </AppLayout>
  );
}
