import { cn } from '@/lib/utils';

export function Table({ headers, children, className }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className }) {
  return <td className={cn('px-4 py-3 text-sm text-gray-300 whitespace-nowrap', className)}>{children}</td>;
}
