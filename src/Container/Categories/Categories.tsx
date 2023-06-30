import CardCategories from '../../Components/UI/Layout/Card/CardCategories';
import { useDeleteCategoryMutation, useGetAllcategoriesQuery } from '../../Store/services/category';
import { CustomError } from '../../interfaces/errors/CustomError';
import Modal from '../../Components/UI/Modal/Modal';
import { useEffect, useState } from 'react';
import { Alert, Box, Container, Grid, Snackbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const { data, isLoading, isError, error } = useGetAllcategoriesQuery();
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

    const navigate = useNavigate();

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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ color: 'black' }}>Список категорий</Typography>
            </Box>
            <Grid container columnSpacing={{ xs: -5, sm: -5, md: -15 }} >
                {data &&
                    data.map((category: any) => {
                        return (
                            <Grid item key={category.id}>
                                <Snackbar
                                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                    open={open}
                                    autoHideDuration={3000}
                                    onClose={handleClose}
                                >
                                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                        {(error as CustomError)?.data?.message}
                                    </Alert>
                                </Snackbar>
                                <Modal
                                    isOpen={openModal && deleteCategoryId === category.id}
                                    onClose={handleClose}
                                    title="Вы действительно хотите удалить эту категорию?"
                                    isLoading={isLoading}
                                    actionButtonLabel="Удалить"
                                    onActionButtonClick={handleConfirmDelete}
                                >
                                </Modal>
                                <CardCategories
                                    id={category.id}
                                    category_name={category.category_name}
                                    category_description={category.category_description}
                                    onClick={() => navigate(`/edit-category/${category.id}`)}
                                    onClickDelete={() => handleDeleteCategory(category.id)}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Container>
    );
};

export default Categories;
