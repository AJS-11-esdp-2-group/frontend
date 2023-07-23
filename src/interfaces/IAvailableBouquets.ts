export interface IAvailableBouquet {
	name_bouquet: string;
	actual_price: number;
	image_bouquet: string;
	added_date: Date;
};

export interface IAvailableBouquets extends IAvailableBouquet {
	id: number;
};