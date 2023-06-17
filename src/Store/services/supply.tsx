import { ISupply, ISupplies } from "../../interfaces/ISupply";
import { api } from "../../features";

interface limit {
    start: number;
    end: number
}

const suppliesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSuppliesBetween: build.mutation<Array<ISupplies>, limit>({
            query: (limit) => `/supply/pagination?start=${limit.start}&end=${limit.end}`,
        })
    })
}); 

export const {useGetSuppliesBetweenMutation} = suppliesApi;