import Box from '@mui/material/Box'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useGetAllActionsQuery } from '../../Store/services/supply'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { IInvoice } from '../../interfaces/IInvoice'

const columns: GridColDef[] = [
  { field: 'id', headerName: '№ накладной', width: 200 },
  {
    field: 'date',
    headerName: 'Дата',
    width: 250,
    valueFormatter: (date) => new Date(date?.value).toLocaleString(),
  },
  {
    field: 'total_sum',
    headerName: 'Сумма',
    type: 'number',
    width: 150,
  },
  {
    field: 'total_items',
    headerName: 'Товаров',
    type: 'number',
    width: 150,
  },
  {
    field: 'supplier_name',
    headerName: 'Поставщик',
    width: 150,
  },
  {
    field: 'storage_name',
    headerName: 'Точка продаж',
    width: 150,
  },
]

const Invoices = () => {
  const navigate = useNavigate()
  const { data: rows } = useGetAllActionsQuery()
  const handleOnCellClick = (params: any) => {
    navigate(`/invoices/${params.row.id}`)
  }

  return (
    <Container>
      <Typography variant="h4">Приходные накладные</Typography>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/new-supply"
        >
          Создать накладную
        </Button>
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        {rows ? (
          <DataGrid
            rows={rows as IInvoice[]}
            columns={columns}
            onCellClick={handleOnCellClick}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        ) : (
          <Box sx={{ width: '100%' }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Invoices
