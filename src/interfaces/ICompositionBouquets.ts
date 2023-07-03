export interface ICompositionBouquets extends ICompositionBouquet{
    id: number,
}

export interface ICompositionBouquet {
    id_bouquet: number,
    item_name: string,
    id_item: string
    qty: string
}