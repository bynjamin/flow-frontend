/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react';
import truncate from 'lodash/truncate';
import { makeStyles, fade } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
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
  // eslint-disable-next-line no-unused-vars
  Column,
} from 'react-table';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import TablePaginationActions from './components/TablePaginationActions';
import TableToolbar from './components/TableToolbar';
// eslint-disable-next-line no-unused-vars
import { OrderDirection, OrderType } from 'app/types';

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
    transition: '0.3s',
  },
  headerRow: {
    fontWeight: 'bold',
  },
  headerCell: {
    zIndex: 10,
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

    useEffect(() => {
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

type Props = {
  title: string;
  columns: Column[];
  data: any[];
  loading: boolean;
  onRowClick: (id: number) => void;
  onCreate?: () => void;
  onDelete?: (selectedRowIds: number[]) => void;
  maxCellLength?: number;
  size?: 'small' | 'medium';
};

const DataTable: React.FC<Props> = ({
  title,
  columns,
  data,
  onRowClick,
  loading,
  onCreate,
  onDelete,
  maxCellLength = 24,
  size = 'medium',
}) => {
  const classes = useStyles();
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
    // @ts-ignore
    state: { pageIndex, pageSize, globalFilter },
    // @ts-ignore
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      if (onDelete) {
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
            Cell: ({ row }: { row: any }) => (
              <div>
                <IndeterminateCheckbox
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
      }
    },
  );

  // @ts-ignore
  function handleChangePage(event, newPage) {
    // loadPage(newPage);
    gotoPage(newPage);
  }
  // @ts-ignore
  function handleChangeRowsPerPage(event) {
    setPageSize(Number(event.target.value));
  }

  function handleDeleteMultiple() {
    if (onDelete) {
      onDelete(selectedFlatRows.map((row: any) => row.original.id));
    }
  }

  return (
    <FuseAnimate animation="transition.slideUpIn" delay={300}>
      <div className="flex flex-col h-full shadow-lg">
        <TableToolbar
          title={title}
          numSelected={Object.keys(selectedFlatRows).length}
          count={preGlobalFilteredRows.length}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
          onCreate={onCreate}
          onDelete={handleDeleteMultiple}
        />
        {loading ? (
          <FuseLoading />
        ) : page.length > 0 ? (
          <TableContainer className={`${classes.root} flex flex-1 flex-col`}>
            <MaUTable {...getTableProps()} stickyHeader size={size}>
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
                        // onClick={() => handleChangeOrder(column.id)}
                        className={classes.headerCell}
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
                {page.map((row: any) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      {...row.getRowProps()}
                      className={classes.dataRow}
                      onClick={() => onRowClick(row.original.id)}
                      hover
                    >
                      {row.cells.map((cell: any) => {
                        if (typeof cell.value === 'string') {
                          cell.value = truncate(cell.value, {
                            length: maxCellLength,
                            separator: ' ',
                          });
                        }
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
        ) : (
          <div className="flex flex-1 items-center justify-center h-full">
            <Typography color="textSecondary" variant="h5">
              There are no records!
            </Typography>
          </div>
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
                count={data.length}
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

export default DataTable;
