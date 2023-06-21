import FormElement from '../../Components/UI/Form/FormElement';
import { CustomError } from '../../interfaces/errors/CustomError';
import { useAddSupplierMutation } from '../../Store/services/suppliers';
import { useNavigate } from 'react-router';
import { Container, Button, Snackbar, Alert } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';

const AddSupplier = () => {
    const [addSupplier, { error, isError }] = useAddSupplierMutation();
    
    interface Props {
        name_supplier: string,
        contact_person: string,
        email: string,
        phone: string,
        address: string,
        id_country: string,
        id_city: string,
    }
    const [form, setForm] = useState<Props>({
        name_supplier: '',
        contact_person: '',
        email: '',
        phone: '',
        address: '',
        id_country: '',
        id_city: '',
    });
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(isError);
    }, [isError]);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await addSupplier(form);
        if (!(data as { error: object }).error) {
            navigate('/suppliers');
        }
    };

    return (
        <form onSubmit={submitFormHandler}>
            <Container component="section" maxWidth="xs" sx={{ marginTop: '100px'}}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert severity="error" onClose={handleClose}>
                        {(error as CustomError)?.data?.message}
                    </Alert>
                </Snackbar>
                <FormElement
                    value={form.name_supplier}
                    label="Name of supplier"
                    name="name_supplier"
                    onChange={inputChangeHandler}
                />
                <FormElement
                    value={form.contact_person}
                    label="Contact person"
                    name="contact_person"
                    onChange={inputChangeHandler}
                />
                <FormElement
                    value={form.email}
                    label="Email"
                    name="email"
                    onChange={inputChangeHandler}
                />
                <FormElement
                    value={form.phone}
                    label="Phone"
                    name="phone"
                    onChange={inputChangeHandler}
                />
                <FormElement
                    value={form.address}
                    label="Address"
                    name="address"
                    onChange={inputChangeHandler}
                />
                <FormElement
                    value={form.id_country}
                    label="Country"
                    name="id_country"
                    onChange={inputChangeHandler}
                />
                <FormElement
                    value={form.id_city}
                    label="City"
                    name="id_city"
                    onChange={inputChangeHandler}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    type="submit"
                    className="submit"
                    sx={{ marginBottom: 2, marginTop: 3 }}
                >
                    Add
                </Button>
            </Container>
        </form>
    );
};
export default AddSupplier;
