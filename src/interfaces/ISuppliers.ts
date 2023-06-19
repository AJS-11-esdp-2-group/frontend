export interface ISuppliers {
    id: number;
    name_supplier: string;
    contact_person: string;
    email: string;
    phone: string;
    address: string;
    id_country: string;
    id_city: string;
    create_date: Date;
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