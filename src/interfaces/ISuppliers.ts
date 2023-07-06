export interface ISuppliers extends ISupplier {
    id: number;
    create_date: Date;
    name_country: string;
    name_city: string;
};

export interface ISupplier {
    name_supplier: string;
    contact_person: string;
    email: string;
    phone: string;
    address: string;
    id_country: string;
    id_city: string;
};
