import { useDeleteCategoryMutation, useGetAllcategoriesQuery } from '../../Store/services/category';
import ICategory from '../../interfaces/ICategory';
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import {
    List,
    ListItemButton,
    ListSubheader,
    ListItemIcon,
    ListItemText,
    Collapse,
} from '@mui/material';
import { Send as SendIcon, Drafts as DraftsIcon, ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';


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

    const handleClose = () => {
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
                    <ListSubheader component="div" id="nested-list-subheader">
                        Список категорий
                    </ListSubheader>
                }
            >
                {data &&
                    data.map((category: ICategory) => {
                        const isItemOpen = category.id === openItemId;
                        return (
                            <React.Fragment key={category.id}>
                                <ListItemButton onClick={() => handleClick(category.id)}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary={category.category_name} />
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
