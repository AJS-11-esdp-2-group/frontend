export default interface IBouquetData {
    bouquet: number;
    actual_price: number;
    total_price: number;
    payment_type: number;
};
export default interface ISendData {
    bouquets: IBouquetData[];
};