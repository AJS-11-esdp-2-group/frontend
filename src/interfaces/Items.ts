export interface Items extends Item {
    id: number;
    id_category: number | string;
};

export interface Item {
    item_name: string;
    item_description: string;
    category_name: string;
    category_name_description: string;
    image_small: string;
    image_large: string;
    id_user: number;
    create_date: Date;
};