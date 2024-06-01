import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Components/Header";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import Filters from "./Components/Filters";
import { AuthLayout } from "./Auth/AuthLayout";
import { AddProperty } from "./Components/AddProperty";
import { authLayout } from "./CSS/auth";
import React from "react";
import { APIRequest } from "./API/requests";
import {
  appLoading,
  filterItemType,
  loadPropertyData,
  loadUser,
  setBySeller,
  setCurrRange,
  setFilterAmenities,
  setFilterCategories,
  setFilterLocations,
  updateAmenitiesStatus,
  updateCategoryStatus,
} from "./Redux/Slices/appslice";
import { PropertyGrid } from "./Components/PropertyGrid";
import SellerDetail from "./Components/SellerDetail";
import { useSearchParams } from "react-router-dom";
import { int, resolveReq } from "./helpers";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((store) => store.app);
  const { enableLogin, propAdd, loading, sellerDetail } = state;

  const [queryParams] = useSearchParams();
  const [loadSeq, setLoadSeq] = React.useState(1);

  // API request handlers
  const initial = React.useCallback(async () => {
    dispatch(appLoading(true));
    const req = new APIRequest();
    const token = await req.getToken();
    if (token) {
      const res = await req.get(`users/${token.email}`);
      const result = resolveReq(res);
      if (result.success) {
        dispatch(loadUser(result.data));
      }
    }
    setLoadSeq(2);
  }, [dispatch]);

  const loadFilters = React.useCallback(async () => {
    const apiRequests = [
      {
        path: "location-list",
        handler: setFilterLocations,
      },
      {
        path: "category-list",
        handler: setFilterCategories,
      },
      {
        path: "tags-list",
        handler: setFilterAmenities,
      },
    ];

    const client = new APIRequest();

    for (const req of apiRequests) {
      const res = await client.get(req.path, true);
      const result = resolveReq(res);
      if (result.success && result.data) {
        const state = result.data.map((item: filterItemType) => ({
          ...item,
          checked: false,
        }));
        dispatch(req.handler(state));
      }
    }

    setLoadSeq(3);
  }, [dispatch]);

  const loadData = React.useCallback(async () => {
    dispatch(appLoading(true));
    const req = new APIRequest();
    const res = await req.get(`property-list`, true, queryParams);
    const result = resolveReq(res);
    if (result.success) {
      dispatch(loadPropertyData(result.data));
    }

    dispatch(appLoading(false));
  }, [dispatch, queryParams]);

  // query parameter handlers
  const loadQueryParameters = React.useCallback(() => {
    const range = queryParams.get("price");
    const byseller = queryParams.get("byseller");
    const catset = queryParams.get("categories");
    const amenset = queryParams.get("amenities");

    if (range) {
      dispatch(setCurrRange(int(range.split(","))));
    }
    if (byseller) {
      dispatch(setBySeller(true));
    }
    if (catset) {
      dispatch(updateCategoryStatus(catset));
    }
    if (amenset) {
      dispatch(updateAmenitiesStatus(amenset));
    }
    setLoadSeq(4);
  }, [queryParams, dispatch]);

  React.useEffect(() => {
    if (loadSeq === 1) {
      // load user
      initial();
    } else if (loadSeq === 2) {
      // load all the filters
      loadFilters();
    } else if (loadSeq === 3) {
      // update all the filters with query parameters
      loadQueryParameters();
    } else if (loadSeq === 4) {
      // finally load data
      loadData();
    }
  }, [initial, loadSeq, loadFilters, loadData, loadQueryParameters]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: { md: "850px", lg: "1200px" },
        mx: "auto",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 75px)",
          position: "sticky",
          top: 0,
        }}
      >
        <Filters />
        <PropertyGrid />
      </Box>
      <Modal open={loading}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            ...authLayout.loadingContainer,
            color: "#fff",
          }}
        >
          <CircularProgress sx={{ color: "#fff" }} />
          <Typography>Loading, please wait...</Typography>
        </Box>
      </Modal>
      <Modal open={Boolean(enableLogin)}>
        <AuthLayout />
      </Modal>
      <Modal open={Boolean(sellerDetail.enable)}>
        <SellerDetail />
      </Modal>
      <Modal open={Boolean(propAdd.enable)}>
        <AddProperty />
      </Modal>
      <ToastContainer />
    </Box>
  );
}

export default App;
