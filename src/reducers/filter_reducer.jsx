import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
  } from '../actions'
  
  const filter_reducer = (state, action) => {
    if( action.type === LOAD_PRODUCTS) {
      //Khong the de all_products:action.payload vi khi copy nhu vay thi filtered_products sẽ cùng tham chiếu về chung 1 chỗ
      // Dùng spread operator copy ra một mảng không ảnh hưởng
      return {...state, all_products: [...action.payload], filtered_products: [...action.payload]}
    }
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default filter_reducer
  