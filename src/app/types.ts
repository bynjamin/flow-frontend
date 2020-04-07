export type OrderDirection = 'asc' | 'desc' | undefined;
export type OrderType = {
  orderBy: string | undefined;
  orderDirection: OrderDirection;
};

export type ActionFeedback = {
  message: string;
  severity: 'info' | 'success' | 'warning' | 'error';
};
