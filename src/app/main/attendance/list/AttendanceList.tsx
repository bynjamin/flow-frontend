import React, { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import LuxonAdapter from '@date-io/luxon';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import FuseLoading from '@fuse/core/FuseLoading';
import useDidUpdateEffect from 'app/hooks/useDidUpdateEffect';
import DataTable from 'app/components/table/DataTable';
import useTableState from 'app/components/table/useTableState';
import UsersAutocomplete from 'app/components/UsersAutocomplete';
import { DEFAULT_PAGE_SIZE } from 'app/constants';
import { MISSING_FIELD } from 'common/constants';

import { ATTENDANCE_LIST } from './queries/attendanceList';
import {
  AttendanceList as DataType,
  AttendanceListVariables as InputType,
} from './queries/__generated__/AttendanceList';

const luxon = new LuxonAdapter();

const AttendanceList: React.FC = () => {
  const [userIdFilter, setUserIdFilter] = useState<number | null>(null);
  const {
    page,
    pageSize,
    order,
    setPage,
    setPageSize,
    setOrder,
  } = useTableState();

  const { loading, error, data, refetch } = useQuery<DataType, InputType>(
    ATTENDANCE_LIST,
    {
      variables: {
        first: DEFAULT_PAGE_SIZE,
        skip: 0,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'user',
        className: 'font-bold',
        Cell: ({ cell: { value } }: any) => (
          <Tooltip placement="bottom-start" title={value.fullName}>
            <Avatar alt={value.fullName}>{value.fullName[0]}</Avatar>
          </Tooltip>
        ),
      },
      {
        Header: 'From',
        accessor: 'start',
        className: 'font-bold',
        Cell: ({ cell: { value } }) => {
          return value
            ? luxon.format(luxon.date(value), 'fullDateTime24h')
            : MISSING_FIELD;
        },
      },
      {
        Header: 'To',
        accessor: 'end',
        className: 'font-bold',
        Cell: ({ cell: { value } }) => {
          return value
            ? luxon.format(luxon.date(value), 'fullDateTime24h')
            : MISSING_FIELD;
        },
      },
      {
        Header: 'To',
        accessor: 'end',
        className: 'font-bold',
        Cell: ({ cell: { value } }) => {
          return value
            ? luxon.format(luxon.date(value), 'fullDateTime24h')
            : MISSING_FIELD;
        },
      },
      {
        Header: 'Total',
        accessor: '',
        className: 'font-bold',
        Cell: ({
          row: {
            original: { start, end },
          },
        }) => {
          if (!end) {
            return MISSING_FIELD;
          }
          const from = luxon.date(start);
          const to = luxon.date(end);
          const { hours, minutes } = to
            .diff(from, ['hours', 'minutes', 'seconds'])
            .toObject();
          return `${hours}h ${minutes}m`;
        },
      },
    ],
    [],
  );

  function getQueryVariables(pageNum: number) {
    const { orderBy, orderDirection } = order;
    const skip = pageNum * pageSize;
    const first = pageSize;
    return { first, skip, orderBy, orderDirection, userId: userIdFilter };
  }

  function loadPage(pageNum: number): void {
    refetch(getQueryVariables(pageNum));
    setPage(pageNum);
  }

  function handleChangePageSize(count: number): void {
    setPageSize(count);
  }

  const filterByUser = (userId: number) => {
    setUserIdFilter(userId);
  };
  useDidUpdateEffect(() => loadPage(0), [userIdFilter]);

  if (error) return <p style={{ color: 'red' }}>{error.message}</p>;
  if (data) {
    const { items, count } = data.attendances;

    return (
      <>
        <CssBaseline />
        <DataTable
          title="Attendance"
          columns={columns}
          data={items}
          count={count}
          pageIndex={page}
          loadPage={loadPage}
          pageSize={pageSize}
          setPageSize={handleChangePageSize}
          order={order}
          setOrder={setOrder}
          loading={loading}
          customFilterComponent={
            <div className="w-400 p-6 bg-white rounded">
              <UsersAutocomplete
                size="small"
                label="Filter by user email"
                setSelected={filterByUser}
              />
            </div>
          }
        />
      </>
    );
  }

  return <FuseLoading />;
};

export default AttendanceList;
