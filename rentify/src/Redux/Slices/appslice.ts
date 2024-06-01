/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { str } from "../../helpers";

export type filterItemType = {
  name: string;
  id: number;
  checked: boolean;
};

export type UserType = {
  contact: string;
  email: string;
  first_name: string;
  is_active: boolean;
  last_name: string;
  role: string;
  id: null | number;
  date_joined: string;
};

type appState = {
  loading: boolean;
  enableLogin: boolean;
  propAdd: {
    enable: boolean;
    context: number | null;
  };
  sellerDetail: {
    enable: boolean;
    context: number[];
  };
  loginReason: string;
  user: UserType;
  filters: {
    location: {
      data: filterItemType[];
      selected: filterItemType | null;
    };
    categories: filterItemType[];
    priceRange: number[];
    amenities: filterItemType[];
    bySeller: boolean;
  };
  propData: any[];
  pageCount: number;
};

const initialState: appState = {
  loading: false,
  enableLogin: false,
  propAdd: {
    enable: false,
    context: null,
  },
  sellerDetail: {
    enable: false,
    context: [],
  },
  loginReason: "",
  user: {
    contact: "",
    email: "",
    first_name: "",
    is_active: false,
    last_name: "",
    role: "",
    id: null,
    date_joined: "",
  },
  filters: {
    location: {
      data: [],
      selected: null,
    },
    categories: [],
    priceRange: [1, 10_000],
    amenities: [],
    bySeller: false,
  },
  propData: [],
  pageCount: 0,
};

const appSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    appLoading: (state, action) => {
      state.loading = action.payload;
    },
    loadUser: (state, action) => {
      state.user = { ...action.payload };
    },
    logoutUser: (state) => {
      state.user = { ...initialState.user };
    },
    setEnableLogin: (state, action) => {
      state.enableLogin = action.payload.enable;
      state.loginReason = action.payload.loginReason || "";
    },
    setEnablePropAdd: (state, action) => {
      state.propAdd = action.payload;
    },
    setEnableSellerDetail: (state, action) => {
      state.sellerDetail = action.payload;
    },
    loadPropertyData: (state, action) => {
      state.propData = action.payload.results || [];
      state.pageCount = action.payload.count || 0;
    },
    // CRUD reducers
    appendProperty: (state, action) => {
      const newState = [action.payload];
      state.propData.forEach((item) => newState.push(item));
      state.propData = newState;
    },
    updateProperty: (state, action) => {
      const index = action.payload.index;
      state.propData[index] = action.payload.data;
    },
    deleteProperty: (state, action) => {
      const id = action.payload;
      state.propData = state.propData.filter((item) => item.id !== id);
    },
    // micro actions reducers
    updateLikes: (state, action) => {
      const index = action.payload.index;
      state.propData[index].like = action.payload.data;
    },
    updateWishList: (state, action) => {
      const index = action.payload.index;
      state.propData[index].wishlist = action.payload.data;
    },
    // Filter reducers
    setFilterLocations: (state, action) => {
      state.filters.location.data = action.payload;
    },
    setFilterCategories: (state, action) => {
      state.filters.categories = action.payload;
    },
    updateCategoryStatus: (state, action) => {
      const lst = action.payload.split(",");
      state.filters.categories = state.filters.categories.map((cat) => {
        return { ...cat, checked: lst.includes(str(cat.id)) };
      });
    },
    setFilterAmenities: (state, action) => {
      state.filters.amenities = action.payload;
    },
    updateAmenitiesStatus: (state, action) => {
      const lst = action.payload.split(",");
      state.filters.amenities = state.filters.amenities.map((amen) => {
        return { ...amen, checked: lst.includes(str(amen.id)) };
      });
    },
    setBySeller: (state, action) => {
      state.filters.bySeller = action.payload;
    },
    setCurrLoc: (state, action) => {
      state.filters.location.selected = action.payload;
    },
    setCurrRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setCurrCat: (state, action) => {
      const index = action.payload.index;
      state.filters.categories[index].checked =
        !state.filters.categories[index].checked;
    },
    setCurrAmen: (state, action) => {
      const index = action.payload.index;
      state.filters.amenities[index].checked =
        !state.filters.amenities[index].checked;
    },
  },
});

export default appSlice.reducer;

export const {
  appLoading,
  loadUser,
  setEnableLogin,
  logoutUser,
  setEnablePropAdd,
  setEnableSellerDetail,
  loadPropertyData,
  // CRUD reducers
  appendProperty,
  updateProperty,
  deleteProperty,
  // micro action reducers
  updateLikes,
  updateWishList,
  // Filter reducers
  setFilterLocations,
  setFilterCategories,
  updateCategoryStatus,
  setFilterAmenities,
  updateAmenitiesStatus,
  setBySeller,
  setCurrLoc,
  setCurrCat,
  setCurrAmen,
  setCurrRange,
} = appSlice.actions;
