export interface IAvailableBouquet {
	id: string;
	name_bouquet: string;
	actual_price: number;
	image_bouquet: string;
	added_date: Date;
	total_sum: number;
};

export interface IAvailableBouquets extends IAvailableBouquet {
	id: string;
};