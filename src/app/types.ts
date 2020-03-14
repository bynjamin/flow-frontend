export type OrderDirection = 'asc' | 'desc' | undefined;
export type OrderType = {
  orderBy: string | undefined;
  orderDirection: OrderDirection;
};
