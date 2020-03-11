import React, { useState, useEffect } from 'react';
import { DEFAULT_PAGE_SIZE } from 'common/constants';
import { OrderDirection } from 'common/types/types';

type ReturnType = {
  page: number;
  pageSize: number;
  orderBy: string | null;
  orderDirection: OrderDirection;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string | null>>;
  setOrderDirection: React.Dispatch<React.SetStateAction<OrderDirection>>;
};

const useTableState = (): ReturnType => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('ASC');

  return {
    page,
    pageSize,
    orderBy,
    orderDirection,
    setPage,
    setPageSize,
    setOrderBy,
    setOrderDirection,
  };
};

export default useTableState;
