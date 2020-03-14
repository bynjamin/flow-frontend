/* eslint-disable react/jsx-key */
import React from 'react';
import toLower from 'lodash/toLower';
import { makeStyles, fade } from '@material-ui/core/styles';
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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import TablePaginationActions from './TablePaginationActions';
import TableToolbar from './TableToolbar';
import { OrderDirection } from '../../types/types';

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid rgba(224, 224, 224, 1)',
  },
  pagination: {
    // backgroundColor: 'rgba(0, 0, 0, 0.04)',
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    backgroundColor: theme.palette.primary.dark,
    borderBottom: 0,
    borderRadius: '0 0 5px 5px',
    color: fade(theme.palette.common.white, 0.9),
  },
  dataRow: {
    cursor: 'pointer',
  },
  headerRow: {
    fontWeight: 'bold',
  },
  tablePaginationSelectIcon: {
    color: fade(theme.palette.common.white, 0.4),
  },
}));

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
  title: string;
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
  loading: boolean;
  onCreate: () => void;
};

const EnhancedTable: React.FC<Props> = ({
  title,
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
  loading,
  onCreate,
}) => {
  const classes = useStyles();
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
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
              <IndeterminateCheckbox
                // @ts-ignore
                {...row.getToggleRowSelectedProps()}
                onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                  e.stopPropagation()
                }
              />
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

  // Render the UI for your table
  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <div className="flex flex-col max-h-full shadow-lg">
        <TableToolbar
          title={title}
          numSelected={Object.keys(selectedRowIds).length}
          deleteRecordHandler={() => console.log('delete')}
          addRecordHandler={() => console.log('create')}
          count={count}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
          onCreate={onCreate}
        />
        {loading ? (
          <FuseLoading />
        ) : (
          <TableContainer className={classes.root}>
            <MaUTable {...getTableProps()} stickyHeader>
              <TableHead>
                {headerGroups.map((headerGroup: any) => (
                  <TableRow
                    {...headerGroup.getHeaderGroupProps()}
                    className={classes.headerRow}
                  >
                    {headerGroup.headers.map((column: any) => (
                      <TableCell
                        {...(column.id === 'selection'
                          ? column.getHeaderProps()
                          : column.getHeaderProps(
                              column.getSortByToggleProps(),
                            ))}
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
        )}
        <MaUTable>
          <TableFooter>
            <TableRow>
              <TablePagination
                className={classes.pagination}
                classes={{
                  selectIcon: classes.tablePaginationSelectIcon,
                }}
                rowsPerPageOptions={[10, 25, 50]}
                count={count}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </MaUTable>
      </div>
    </FuseAnimate>
  );
};

export default EnhancedTable;
