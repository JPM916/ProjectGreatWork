import { getCategoryClass, getStatusClass } from '@/Utils/reservationsUtils';
import { ReservationItem, headers } from '@/Constant/reservationConstants';

export default function ReservationTable({ data }: { data: ReservationItem[] }) {
  return (
    <>
      <div className="grid grid-cols-8 gap-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
        {headers.map(header => (
          <div key={header}>{header}</div>
        ))}
      </div>

      <div className="divide-y divide-gray-100">
        {data.map((res) => (
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
    </>
  );
}