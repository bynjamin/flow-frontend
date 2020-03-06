/* eslint-disable react/jsx-key */
import React from 'react';
import toLower from 'lodash/toLower';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import TablePaginationActions from './TablePaginationActions';
import TableToolbar from './TableToolbar';
import { OrderDirection } from '../../types/types';

const useStyles = makeStyles({
  pagination: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderBottom: 0,
    borderRadius: '0 0 5px 5px',
  },
  dataRow: {
    cursor: 'pointer',
  },
});

const IndeterminateCheckbox = React.forwardRef(
  // @ts-ignore
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      // @ts-ignore
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        {/*
        //@ts-ignore */}
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  },
);

const inputStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  background: 'transparent',
};

type Props = {
  columns: any[];
  data: any[];
  count: number;
  pageIndex: number;
  loadPage: any;
  pageSize: number;
  orderBy: string | null;
  orderDirection: any;
  setPageSize: (count: number) => void;
  setOrderBy: React.Dispatch<React.SetStateAction<string | null>>;
  setOrderDirection: React.Dispatch<React.SetStateAction<OrderDirection>>;
  onRowClick: (id: number) => void;
};

const EnhancedTable: React.FC<Props> = ({
  columns,
  data,
  count,
  loadPage,
  pageSize,
  setPageSize,
  pageIndex,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  onRowClick,
}) => {
  const classes = useStyles();
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      manualPagination: true,
      // manualSortBy: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push((_columns: any) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          // @ts-ignore
          Cell: ({ row }) => (
            <div>
              {/*
              //@ts-ignore */}
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ..._columns,
      ]);
    },
  );
  // @ts-ignore
  const handleChangePage = (event, newPage) => {
    loadPage(newPage);
  };
  // @ts-ignore
  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
  };
  // @ts-ignore
  const removeByIndexs = (array, indexs) =>
    // @ts-ignore
    array.filter((_, i) => !indexs.includes(i));

  // Render the UI for your table
  return (
    <>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        deleteUserHandler={() => console.log('delete')}
        addUserHandler={() => console.log('create')}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <TableContainer>
        <MaUTable {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <TableCell
                    {...(column.id === 'selection'
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.render('Header')}
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row: any, i: number) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  className={classes.dataRow}
                  onClick={() => onRowClick(row.original.id)}
                  hover
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
      <MaUTable>
        <TableFooter>
          <TableRow>
            <TablePagination
              className={classes.pagination}
              rowsPerPageOptions={[10, 25, 50]}
              count={count}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </>
  );
};

export default EnhancedTable;
