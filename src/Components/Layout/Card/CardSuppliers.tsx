import React, {MouseEventHandler} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


interface IProps {
    image: string
    name: string
    onClick: MouseEventHandler<HTMLButtonElement>
    onClickDelete: MouseEventHandler<HTMLButtonElement>
    description: string
    create_date: string
    category_description: string
    id_category: number

}
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardSuppliers = ({name, description, category_description, create_date, image, onClick, id_category, onClickDelete}: IProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 500, m: '25px' }}>
            <CardHeader
                sx={{height: '80px'}}
                action={[
                    <IconButton onClick={onClickDelete} aria-label="settings">
                        <DeleteForeverIcon/>
                    </IconButton>,
                    <IconButton onClick={onClick} aria-label="settings">
                        <EditIcon/>
                    </IconButton>,
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                ]}
                title={name}
                subheader={create_date}
            />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{id_category}</Typography>
                    <Typography paragraph>{description}</Typography>
                    <Typography paragraph>{category_description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default CardSuppliers