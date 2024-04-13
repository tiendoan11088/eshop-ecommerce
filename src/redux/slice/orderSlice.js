import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderHistory: [],
    totalOrderAmount: null
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    STORE_ORDERS(state, action){
        state.orderHistory = action.payload
    },
    CALC_TOTAL_ORDER_AMOUNT(state,action){
      const array = [];
      state.orderHistory.map((item)=> {
        const {orderAmount} = item;
        return array.push(orderAmount)
      })
      const totalAmount = array.reduce((a,b)=> {
        return a+b;
      },0)
      state.totalOrderAmount = totalAmount
    },
    UPDATE_ORDER_STATUS(state, action) {
      const { id, orderStatus } = action.payload;
      const orderIndex = state.orderHistory.findIndex(order => order.id === id);
      if (orderIndex !== -1) {
          state.orderHistory[orderIndex].orderStatus = orderStatus;
      }
  }
  }
});

export const {STORE_ORDERS,CALC_TOTAL_ORDER_AMOUNT,UPDATE_ORDER_STATUS} = orderSlice.actions

export const selectOrderHistory = (state) => state.orders?.orderHistory || [];
export const selectTotalOrderAmount = (state) => state.orders ? state.orders.totalOrderAmount : null;


export default orderSlice.reducer