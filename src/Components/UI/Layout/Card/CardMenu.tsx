import { Card, CardHeader, Avatar, CardActionArea, CardActions, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

interface Props {
  menuName: string;
  color: string;
}

const MenuCard = ({ menuName, color }: Props) => {
  return (
    <Card sx={{ bgcolor: color, width: 180}}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar>
              <FolderIcon />
            </Avatar>
          }
        />
        <CardActions>
              <Typography variant="h6">{menuName}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default MenuCard;