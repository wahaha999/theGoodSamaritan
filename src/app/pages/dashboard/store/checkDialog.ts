import { createSlice,PayloadAction } from "@reduxjs/toolkit"

export interface ICheckDialog {
    open: boolean,
    checkType: 'post' | 'comment',
    dialogId:number
};

const initialState: ICheckDialog = {
    open: false,
    checkType: 'post',
    dialogId:NaN
}

export const checkDialogSlice = createSlice({
    name: 'checkDialog',
    initialState,
    reducers: {
        openCheckDialog: (state, action: PayloadAction<ICheckDialog>) => {
            Object.assign(state, action.payload);
        },
        closeCheckDialog: () => initialState
    }
});

export const {openCheckDialog,closeCheckDialog} = checkDialogSlice.actions
export default checkDialogSlice.reducer