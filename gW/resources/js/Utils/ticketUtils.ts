export const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    pending: 'bg-red-100 text-red-700',
    ongoing: 'bg-green-100 text-green-700',
    'archived/delivered': 'bg-blue-100 text-blue-700',
  };
  return `${map[status.toLowerCase()] || 'bg-gray-100 text-gray-600'} text-xs px-3 py-1 rounded-full font-semibold`;
};
export const getCategoryBadgeColor = (category: string) => {
  const base = 'text-xs font-medium px-3 py-1 rounded-lg whitespace-nowrap';
  switch (category?.toLowerCase()) {
    case 'technical': return `${base} bg-green-100 text-green-700`;
    case 'billing': return `${base} bg-blue-100 text-blue-700`;
    case 'support': return `${base} bg-yellow-100 text-yellow-700`;
    case 'bug': return `${base} bg-red-100 text-red-700`;
    default: return `${base} bg-gray-100 text-gray-700`;
  }
};
