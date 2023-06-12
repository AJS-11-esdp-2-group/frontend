import {createSlice} from "@reduxjs/toolkit";



const initialState: any = {
    goods: []

}


const CrmSlice = createSlice({
    name: 'crm',
    initialState,
    reducers: {}
})



export default CrmSlice.reducer
