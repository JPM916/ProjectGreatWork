export const getCategoryClass = (category: string) => {
    const map: Record<string, string> = {
      'co-working': 'bg-cyan-100 text-cyan-700',
      'virtual': 'bg-blue-100 text-blue-700',
      'private': 'bg-indigo-100 text-indigo-700',
      'meeting': 'bg-purple-100 text-purple-700',
    };
    return `${map[category.toLowerCase()] || 'bg-gray-100 text-gray-700'} text-xs px-3 py-1 rounded-full font-semibold`;
  };
  
  export const getStatusClass = (status: string) => {
    const map: Record<string, string> = {
      'upcoming': 'bg-yellow-100 text-yellow-700',
      'ongoing': 'bg-green-100 text-green-700',
      'archived/delivered': 'bg-gray-200 text-gray-700',
    };
    return `${map[status.toLowerCase()] || 'bg-gray-100 text-gray-600'} text-xs px-3 py-1 rounded-full font-semibold`;
  };
  