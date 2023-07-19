import { ISupplies } from '../../../../interfaces/ISupply';
import {TableHead,TableRow,TableCell,} from '@mui/material';

interface EnhancedTableProps {
	numSelected: number;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	rowCount: number;
}

interface HeadCell {
	id: keyof ISupplies;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'source',
		numeric: false,
		label: 'Название',
	},
	{
		id: 'target',
		numeric: true,
		label: 'В наличии',
	},
	{
		id: 'item_name',
		numeric: true,
		label: 'Количество',
	},
	{
		id: 'qty',
		numeric: true,
		label: 'Закуп.цена',
	},
    {
		id: 'total_price',
		numeric: true,
		label: 'Общая сумма',
	},
];

export default function EnhancedTableHead() {

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="normal"></TableCell>
				{headCells.map((headCell) => (
					<TableCell
						size="medium"
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
					>
                        {headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}