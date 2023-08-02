export interface IAvailableBouquet {
	id: number;
	count: number;
	name_bouquet: string;
	actual_price: number;
	image_bouquet: string;
	added_date: Date;
	total_sum: number;
};

export interface IAvailableBouquets extends IAvailableBouquet {
	id: number;
};
export interface ISendToShowCase {
	bouquets: number[]
}