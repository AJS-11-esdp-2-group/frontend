export interface IActions extends IAction {
	id: number;
};

export interface IAction {
	id_bouquet: number;
	item_name: string;
	qty: number;
    price: number
};
