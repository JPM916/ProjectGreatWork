import { useState } from 'react';

type Props = {
  statuses: string[];
  activeStatus: string;
  searchQuery: string;
  onStatusChange: (status: string) => void;
  onSearchChange: (query: string) => void;
};

export default function SearchAndFilter({
    statuses,
    activeStatus,
    searchQuery,
    onStatusChange,
    onSearchChange,
  }: {
    statuses: string[];
    activeStatus: string;
    searchQuery: string;
    onStatusChange: (status: string) => void;
    onSearchChange: (query: string) => void;
  }) {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex gap-4">
          {statuses.map(status => {
            const key = status.toLowerCase();
            return (
              <button
                key={status}
                onClick={() => onStatusChange(key)}
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
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>
    );
  }
  