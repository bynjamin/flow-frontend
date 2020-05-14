import React, { useState } from 'react';
import { DEFAULT_PAGE_SIZE } from 'app/constants';
import { OrderType } from 'app/types';

type ReturnType = {
  page: number;
  pageSize: number;
  order: OrderType;
  globalFilter: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
};

const initialOrder = {
  orderBy: undefined,
  orderDirection: undefined,
};

const useTableState = (): ReturnType => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [order, setOrder] = useState<OrderType>(initialOrder);
  const [globalFilter, setGlobalFilter] = useState<string>('');

  return {
    page,
    pageSize,
    order,
    globalFilter,
    setPage,
    setPageSize,
    setOrder,
    setGlobalFilter,
  };
};

export default useTableState;
