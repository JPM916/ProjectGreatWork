
export const statuses = ['All', 'Upcoming', 'Ongoing', 'Archived/Delivered'];

export const headers = [
  'Name',
  'Category',
  'Email',
  'Contact No.',
  'Start Date',
  'End Date',
  'Location',
  'Status'
];

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
