import {PayloadAction, createSlice} from '@reduxjs/toolkit'
const initialState = {
  states: [] as any[],
  loading: false,
  filter: {
    search: '',
    sort_by: 'desc',
    select: 0,
  },
  search: {},
}
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: {
      reducer: (state, action: PayloadAction<string[]>) => {
        state.filter = {...state.filter, ...action.payload}
      },
      prepare: (filter: any) => {
        let temp: any = {view: [], states: [], purpose: [], category: []}
        Object.keys(filter).forEach((item: string) => {
          if (typeof filter[item] === 'object') {
            Object.keys(filter[item]).forEach((item1: string) => {
              if (item === 'view' && filter[item][item1] === true) {
                temp.view.push(item1)
              }
              if (item === 'state' && filter[item][item1] === true) {
                temp.states.push(item1)
              }
              if (item === 'purpose' && filter[item][item1] === true) {
                switch (item1) {
                  case 'sharing_message':
                    temp.purpose.push(1)
                    break
                  case 'resource_to_share':
                    temp.purpose.push(2)
                    break
                  case 'need_resources':
                    temp.purpose.push(3)
                    break
                  case 'have_event':
                    temp.purpose.push(4)
                    break

                  default:
                    break
                }
              }
              if (item === 'category' && filter[item][item1] === true) {
                temp.category.push(item1)
              }
            })
          }
        })
        return {payload: temp}
      },
    },
    setLoading: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload
      },
      prepare: (status: boolean) => {
        return {payload: status}
      },
    },
    addFilterForHeader: {
      reducer: (state, action: PayloadAction<Record<string, string>>) => {
        state.filter = {...state.filter, ...action.payload}
      },
      prepare: (filter: Record<string, string>) => {
        return {payload: filter}
      },
    },
  },
})

export const {addFilter, setLoading, addFilterForHeader} = filterSlice.actions

export default filterSlice.reducer
