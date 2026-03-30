'use client';

import { useState } from 'react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (id: string) => void;
  searchKey?: keyof T;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  searchKey,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');

  const filtered = searchKey
    ? data.filter((row) =>
        String(row[searchKey]).toLowerCase().includes(query.toLowerCase())
      )
    : data;

  return (
    <div>
      {searchKey && (
        <div className="mb-4 flex items-center gap-2 border border-white/10 px-3 py-2 w-full max-w-xs">
          <span className="material-symbols-outlined text-white/30 text-base">search</span>
          <input
            type="text"
            placeholder="Rechercher..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-xs font-['Space_Grotesk'] text-white/70 placeholder:text-white/20 outline-none w-full uppercase tracking-widest"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-['Space_Grotesk']">
          <thead>
            <tr className="border-b border-white/5">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left py-3 px-4 text-white/30 uppercase tracking-widest font-bold"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right py-3 px-4 text-white/30 uppercase tracking-widest font-bold">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="text-center py-16 text-white/20 uppercase tracking-widest"
                >
                  Aucune donnée
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="py-3 px-4 text-white/70">
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[String(col.key)] ?? '—')}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1.5 text-white/30 hover:text-[#ff5722] transition-colors"
                            title="Modifier"
                          >
                            <span className="material-symbols-outlined text-base">edit</span>
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row.id)}
                            className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                            title="Supprimer"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
