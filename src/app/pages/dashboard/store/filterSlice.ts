import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    states: [] as any[],
    loading:false
};
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilter: {
            reducer: (state, action: PayloadAction<string[]>) => {
            state.states = [...action.payload];
            },
            prepare: (filter: Record<string, boolean>) => {
                let temp:string[] = [];
                Object.keys(filter).forEach((item:string)=>{
                    if (filter[item]) {
                        temp.push(item);
                    }
                }
                )
                return {payload:temp};
            }
            
        },
        setLoading: {
            reducer: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
            },
            prepare: (status: boolean) => {
                return{payload:status}
            }
        }
        
    }
})

export const {addFilter,setLoading} = filterSlice.actions

export default filterSlice.reducer