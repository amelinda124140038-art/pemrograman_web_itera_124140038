import { useMemo } from 'react';

export function useBookStats(books = []) {
  return useMemo(() => {
    const total = books.length;
    const milik = books.filter((b) => b.status === 'milik').length;
    const baca = books.filter((b) => b.status === 'baca').length;
    const beli = books.filter((b) => b.status === 'beli').length;

    return {
      total,
      milik,
      baca,
      beli,
      milikPercent: total ? Math.round((milik / total) * 100) : 0,
      bacaPercent: total ? Math.round((baca / total) * 100) : 0,
      beliPercent: total ? Math.round((beli / total) * 100) : 0,
    };
  }, [books]);
}