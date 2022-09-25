import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: 'price-lowest' //Currently has 4 value: price-lowest, price-highest, name-a-z, name-z-a
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [ state, dispatch ] = useReducer(reducer, initialState)

  //Use useEffect to set products to all_products
  useEffect(()=> {
    //dispatch action to filter_reducer
    dispatch({type: LOAD_PRODUCTS, payload:products})
  },[products])

  //set grid view or list view
  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW})
  }

  const setListView = () => {
    dispatch({type: SET_LISTVIEW})
  }

  const updateSort = (e) => {

    // const name = e.target.name;
    const value = e.target.value;
    dispatch({type: UPDATE_SORT, payload: value})
  }

  //useEffect dispatch SORT_PRODUCTS in reducer after running updateSort
  useEffect(()=> {
    dispatch({type: SORT_PRODUCTS})
  },[products, state.sort])
  return (
    <FilterContext.Provider value={{...state, setGridView, setListView, updateSort }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
