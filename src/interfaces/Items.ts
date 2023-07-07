export interface Items extends Item {
	id: number;
	id_category: string;
	create_date: Date;
}

export interface Item {
	item_name: string;
	item_description: string;
	id_category: string;
	id_subcategory: string;
	id_under_subcategory: string;
	id_user: number;
}
