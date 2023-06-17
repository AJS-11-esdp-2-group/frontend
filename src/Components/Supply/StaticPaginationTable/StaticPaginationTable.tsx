import { ISupplies } from '../../../interfaces/ISupply';
import { useGetAllSuppliersQuery } from '../../../Store/services/suppliers';
import { useGetSuppliesSupplierMutation } from '../../../Store/services/supply';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { visuallyHidden } from '@mui/utils';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ISupplies;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'source',
    numeric: false,
    disablePadding: true,
    label: 'Поставщик',
  },
  {
    id: 'target',
    numeric: true,
    disablePadding: false,
    label: 'Хранилище',
  },
  {
    id: 'item_name',
    numeric: true,
    disablePadding: false,
    label: 'Товар',
  },
  {
    id: 'qty',
    numeric: true,
    disablePadding: false,
    label: 'Количество',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Цена за единицу',
  },
  {
    id: 'total_price',
    numeric: true,
    disablePadding: false,
    label: 'Общая цена',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Дата',
  }
];

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ISupplies) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof ISupplies) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {};

const handleClick = (event: React.MouseEvent<unknown>, name: string) => {};

export default function CustomPaginationActionsTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState<keyof ISupplies>('target');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dense, setDense] = React.useState(false);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [rows, setRows] = React.useState<ISupplies[] | []>([]);
  const [supplierID, setSupplierID] = React.useState('');
  const { data, isLoading } = useGetAllSuppliersQuery();
  const [getSuppliesSupplier] = useGetSuppliesSupplierMutation();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ISupplies,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const handleChange = async(event: SelectChangeEvent) => {
    const result = await getSuppliesSupplier(parseInt(event.target.value as string));
    
    if (!(result as { error: object }).error){
      setRows((result as {data: Array<ISupplies>}).data);
    } 
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage: any = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{width: '100%'}}>
      <Box sx={{ minWidth: 120, marginBottom: 3, marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Выберите поставщика</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={supplierID}
            label="Поставщик"
            onChange={handleChange}
          >
            {
              data && data.map(item => <MenuItem key={item.id} value={item.id}>{item.name_supplier}</MenuItem>)
            }
          </Select>
        </FormControl>
      </Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer >
          <Table sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
            />
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.source}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.target}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.item_name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.qty}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.price}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {row.total_price}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {new Date(row.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination style={{width: '100%'}}
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          colSpan={3}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </Box>
  );
}