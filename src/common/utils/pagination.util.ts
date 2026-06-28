export interface PaginationResult<T> {
  items: T[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

export function buildPagination<T>(
  items: T[],
  total: number,
  page: number,
  limit: number,
): PaginationResult<T> {
  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}