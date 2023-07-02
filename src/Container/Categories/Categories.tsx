import { useDeleteCategoryMutation, useGetAllcategoriesQuery } from '../../Store/services/categories';
import { ICategories } from '../../interfaces/ICategories';
import Modal from '../../Components/UI/Modal/Modal';
import React, { useEffect, useState } from 'react';
import {
    Container,
    List,
    ListItemButton,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography
} from '@mui/material';
import {
    Add,
    Send as SendIcon,
    Drafts as DraftsIcon,
    ExpandLess,
    ExpandMore,
    StarBorder
} from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'

const Categories = () => {
    const { data, isLoading, isError, error } = useGetAllcategoriesQuery();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);
    const [openItemId, setOpenItemId] = useState<number | null>(null);

    const handleClick = (itemId: number) => {
        setOpenItemId(itemId === openItemId ? null : itemId);
    };

    useEffect(() => {
        setOpen(isError);
    }, [isError]);

    const handleCloseModal = () => {
        setOpen(false);
        setOpenModal(false);
    };

    const [deleteCategory] = useDeleteCategoryMutation();

    const handleDeleteCategory = async (categoryId: number) => {
        setDeleteCategoryId(categoryId);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteCategoryId) {
            try {
                const result = await deleteCategory(deleteCategoryId);
                if ('error' in result && result.error) {
                    setOpenModal(true);
                    setOpen(true);
                } else {
                    setOpenModal(false);
                }
            } catch (error) {
                setOpenModal(true);
                setOpen(true);
            }
            setDeleteCategoryId(null);
        }
    };

    if (isLoading) return <h1>Loading...</h1>;
    return (
        <Container maxWidth={'xl'} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader
                        component="div"
                        id="nested-list-subheader"
                        sx={{ fontSize: '1.5rem', textAlign: 'center', color: 'white' }}
                    >
                        Список категорий
                    </ListSubheader>
                }
            >
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Add />
                        </ListItemIcon>
                        <Typography
                            component={Link}
                            to="/new-category"
                            sx={{ color: '#AAAAAA' }}
                        >
                            Создать категорию
                        </Typography>
                    </ListItemButton>
                </ListItem>
                {data &&
                    data.map((category: ICategories) => {
                        const isItemOpen = category.id === openItemId;
                        return (
                            <React.Fragment key={category.id}>
                                <Modal
                                    isOpen={openModal && deleteCategoryId === category.id}
                                    onClose={handleCloseModal}
                                    title="Вы действительно хотите удалить эту категорию?"
                                    isLoading={isLoading}
                                    actionButtonLabel="Удалить"
                                    onActionButtonClick={handleConfirmDelete}
                                >
                                </Modal>
                                <ListItemButton onClick={() => handleClick(category.id)}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary={category.category_name} />
                                    <IconButton onClick={() => handleDeleteCategory(category.id)} aria-label="settings">
                                        <DeleteForeverIcon />
                                    </IconButton>
                                    {isItemOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <SendIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={category.category_description} />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        );
                    })}
            </List>
        </Container>
    );
};

export default Categories;
