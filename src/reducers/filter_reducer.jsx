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

    //Set grid_view value in filter_context
    if (action.type === SET_GRIDVIEW) {
      return { ...state, grid_view:true}
    }
    if (action.type === SET_LISTVIEW) {
      return { ...state, grid_view: false }
    }
    //Update sort action from sort.js component, state in filter_context
    if (action.type === UPDATE_SORT) {
      console.log("In reducer", action.payload)
      return { ...state, sort: action.payload}
    }

    if (action.type === SORT_PRODUCTS) {
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b)=> a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b)=> b.price - a.price)
      }
      if (sort === 'name-a-z') {
        tempProducts = tempProducts.sort((a, b)=> {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-z-a') {
        tempProducts = tempProducts.sort((a, b)=> {
          return b.name.localeCompare(a.name)
        })
      }
      return { ...state, filtered_products: tempProducts}
    }
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default filter_reducer
  