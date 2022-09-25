import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    //filter
    //Tao mot mang maxPrice voi mảng giá trị lay tu price cua  các product
    let maxPrice = action.payload.map((p) => p.price);
    //Dùng hàm max lấy giá trị từ mảng Price với phương pháp spread operator
    maxPrice = Math.max(...maxPrice);
    //Khong the de all_products:action.payload vi khi copy nhu vay thi filtered_products sẽ cùng tham chiếu về chung 1 chỗ
    // Dùng spread operator copy ra một mảng không ảnh hưởng
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
      },
    };
  }

  //Set grid_view value in filter_context
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  //Update sort action from sort.js component, state in filter_context
  if (action.type === UPDATE_SORT) {
    console.log("In reducer", action.payload);
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: tempProducts };
  }

  // Filters
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value }, //set property dynamically
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    return { ...state };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        //To keep min_price va max_price
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price, //Default price is max_price
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
