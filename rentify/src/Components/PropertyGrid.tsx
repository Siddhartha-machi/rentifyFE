/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlaylistAddCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCircleOutlined";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import PlaylistAddCheckCircleRoundedIcon from "@mui/icons-material/PlaylistAddCheckCircleRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

import fallback from "../assets/item.avif";
import { gridStyles, propCardStyles } from "../CSS/content";
import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  deleteProperty,
  setEnableLogin,
  setEnablePropAdd,
  setEnableSellerDetail,
  updateLikes,
  updateWishList,
} from "../Redux/Slices/appslice";
import { APIRequest } from "../API/requests";
import { useSearchParams } from "react-router-dom";
import { resolveReq, str } from "../helpers";

const sortOptions = ["price", "bedrooms", "baths"];

export const PropertyGrid = () => {
  const [queryParams, setQueryParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { user, propData, pageCount } = useAppSelector((store) => store.app);
  const { location } = useAppSelector((store) => store.app.filters);

  const [loading, setLoading] = React.useState(false);
  const [sortType, setsortType] = React.useState("");
  const [page, setPage] = React.useState(1);

  const updateQueryParams = React.useCallback(
    (key: string, val: string) => {
      queryParams.set(key, val);
      setQueryParams(queryParams);
    },
    [queryParams, setQueryParams]
  );

  const handlePageChange = React.useCallback(
    (value: number) => {
      updateQueryParams("offset", str((value - 1) * 6));
    },
    [updateQueryParams]
  );

  const handleChange = (event: SelectChangeEvent, child: unknown) => {
    const key = (child as React.ReactElement).props["fill-key"];
    if (key) {
      updateQueryParams("ordering", key);
    }
    setsortType(event.target.value as string);
  };

  const enableLoginDialog = (message: string) => {
    dispatch(
      setEnableLogin({
        enable: true,
        loginReason: `Please signin to ${message} a property`,
      })
    );
  };

  const handleBuyerLookup = (context: Array<number>) => {
    if (!user.is_active) {
      dispatch(
        setEnableLogin({
          enable: true,
          loginReason: "You need to login to view the seller details.",
        })
      );
    } else {
      dispatch(
        setEnableSellerDetail({
          enable: true,
          context,
        })
      );
    }
  };

  const crudHandler = async (type: number, index: number, id: number) => {
    if (type === 1) {
      dispatch(setEnablePropAdd({ enable: true, context: index }));
    } else {
      // send request to delete handler
      setLoading(true);
      const client = new APIRequest();
      const res = await client.delete(`property-list/${id}`);
      const result = resolveReq(res);
      if (result.success) {
        dispatch(deleteProperty(id));
      }
      setLoading(false);
    }
  };

  const likeHandler = async (
    likeLst: Array<number>,
    id: number,
    liked: boolean,
    index: number
  ) => {
    if (user.is_active) {
      const client = new APIRequest();
      let payload = [...likeLst];
      if (liked) {
        payload = payload.filter((id) => id !== user.id);
      } else {
        payload.push(user.id as number);
      }
      const res = await client.update(`property-list/${id}`, { like: payload });
      const result = resolveReq(res);
      if (result.success) {
        dispatch(updateLikes({ index, data: payload }));
      }
    } else {
      enableLoginDialog("like");
    }
  };

  const wishlistHandler = async (
    wishlist: Array<number>,
    id: number,
    added: boolean,
    index: number
  ) => {
    if (user.is_active) {
      const client = new APIRequest();
      let payload = [...wishlist];
      if (added) {
        payload = payload.filter((id) => id !== user.id);
      } else {
        payload.push(user.id as number);
      }
      const res = await client.update(`property-list/${id}`, {
        wishlist: payload,
      });
      const result = resolveReq(res);
      if (result.success) {
        dispatch(updateWishList({ index, data: payload }));
      }
    } else {
      enableLoginDialog("wishlist");
    }
  };

  React.useEffect(() => {
    const offset = queryParams.get("offset");
    const ordering = queryParams.get("ordering");

    if (offset) {
      setPage(Math.ceil((parseInt(offset) + 1) / 6));
    } else {
      handlePageChange(1);
    }
    if (ordering) {
      const field = ordering.replace("-", "");
      setsortType(
        `Sort by ${field} ${
          field[0] !== ordering[0] ? "decreasing" : "increasing"
        }`
      );
    } else {
      updateQueryParams("ordering", "price");
    }
  }, [dispatch, queryParams, handlePageChange, updateQueryParams]);

  return (
    <Box sx={gridStyles.PropGridContainer}>
      <Box sx={gridStyles.gridHeader}>
        <Box sx={gridStyles.headerLeft}>
          <Box sx={gridStyles.headerInnerLeft}>
            <Typography sx={gridStyles.message}>
              Available for Rent in
            </Typography>
            <Typography sx={gridStyles.availableLoc}>
              {location.selected ? location.selected.name : "All locations"}
            </Typography>
          </Box>
          <Typography sx={gridStyles.availCount}>
            {propData.length}{" "}
            {propData.length === 1 ? "property" : "properties"} available
          </Typography>
        </Box>
        <Box sx={gridStyles.sortByContainer}>
          <Select
            sx={gridStyles.sortby}
            size="small"
            value={sortType}
            displayEmpty
            onChange={handleChange}
            renderValue={(val) => sortType || val || "Sort by"}
            MenuProps={{
              sx: gridStyles.menuSelect,
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem
                sx={gridStyles.menuItem}
                key={`inc-${option}`}
                fill-key={option}
                value={`Sort by ${option} increasing`}
              >
                Sort by {option} increasing
              </MenuItem>
            ))}
            {sortOptions.map((option) => (
              <MenuItem
                sx={gridStyles.menuItem}
                fill-key={`-${option}`}
                key={`dec-${option}`}
                value={`Sort by ${option} decreasing`}
              >
                Sort by {option} decreasing
              </MenuItem>
            ))}
          </Select>
          <Pagination
            count={Math.ceil(pageCount / 6)}
            siblingCount={0}
            boundaryCount={0}
            variant="outlined"
            page={page}
            onChange={(_, v) => handlePageChange(v)}
            sx={gridStyles.pagination}
          />
        </Box>
      </Box>
      {propData.length ? (
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={propCardStyles.gridContainer}
        >
          {propData.map((data: any, key: number) => {
            const img = data?.images?.image || fallback;
            const interested = data.wishlist.includes(user.id);
            const liked = data.like.includes(user.id);
            return (
              <Grid item sm={6} lg={4} xs={12} key={key}>
                <Box sx={propCardStyles.cardStyles}>
                  <Box sx={propCardStyles.header}>
                    <Box component={"img"} src={img} sx={propCardStyles.img} />
                    {data.seller === user.id && (
                      <Box sx={propCardStyles.actionsBox}>
                        <IconButton
                          sx={propCardStyles.editButton}
                          onClick={() => crudHandler(1, key, data.id)}
                        >
                          <CreateRoundedIcon sx={propCardStyles.actionIcon} />
                        </IconButton>
                        <IconButton
                          disabled={loading}
                          sx={propCardStyles.delButton}
                          onClick={() => crudHandler(0, key, data.id)}
                        >
                          {loading ? (
                            <CircularProgress
                              size="1.2rem"
                              sx={{ color: "inherit" }}
                            />
                          ) : (
                            <DeleteRoundedIcon sx={propCardStyles.actionIcon} />
                          )}
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                  <Box sx={propCardStyles.cardContent}>
                    <Box sx={propCardStyles.top}>
                      <Box sx={propCardStyles.priceBox}>
                        <Typography sx={propCardStyles.propPrice}>
                          $ {data.price}
                        </Typography>
                        <Typography sx={propCardStyles.priceRight}>
                          /month
                        </Typography>
                      </Box>
                      <Box sx={propCardStyles.propActions}>
                        <Button
                          disableTouchRipple
                          onClick={() =>
                            wishlistHandler(
                              data.wishlist,
                              data.id,
                              interested,
                              key
                            )
                          }
                          startIcon={
                            interested ? (
                              <PlaylistAddCheckCircleRoundedIcon />
                            ) : (
                              <PlaylistAddCircleOutlinedIcon />
                            )
                          }
                          sx={propCardStyles.iButton}
                        >
                          {interested ? "Interested" : "Add to interest"}
                        </Button>
                      </Box>
                    </Box>
                    <Typography sx={propCardStyles.propName}>
                      {data.property_name}
                    </Typography>
                    <Typography sx={propCardStyles.address}>
                      <LocationOnIcon />
                      {data.place} {data.street}
                    </Typography>
                    <Box sx={propCardStyles.meta}>
                      <Box sx={propCardStyles.metaItem}>
                        <BedIcon sx={propCardStyles.metaItemIcon} />
                        <Typography sx={propCardStyles.metaItemText}>
                          {data.bedrooms}
                        </Typography>
                      </Box>
                      <Box sx={propCardStyles.metaItem}>
                        <BathtubIcon sx={propCardStyles.metaItemIcon} />
                        <Typography sx={propCardStyles.metaItemText}>
                          {data.baths}
                        </Typography>
                      </Box>
                      <Box sx={propCardStyles.metaItem}>
                        <OpenWithIcon sx={propCardStyles.metaItemIcon} />
                        <Typography sx={propCardStyles.metaItemText}>
                          2000 sq
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={propCardStyles.footer}>
                      <Button
                        disableTouchRipple
                        fullWidth
                        sx={propCardStyles.sellerButton}
                        onClick={() => handleBuyerLookup([data.seller, key])}
                      >
                        Get Seller Details
                      </Button>
                      <IconButton
                        onClick={() =>
                          likeHandler(data.like, data.id, liked, key)
                        }
                        sx={{
                          ...propCardStyles.likeButton,
                          ...(liked && propCardStyles.likedButton),
                        }}
                      >
                        <FavoriteRoundedIcon sx={propCardStyles.actionIcon} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box sx={gridStyles.noDataBox}>
          <FilterAltOffOutlinedIcon sx={gridStyles.noDataIcon} />
          <Typography sx={gridStyles.noDataTxt}>
            No data matching the filters. Change the filters and try again!
          </Typography>
        </Box>
      )}
    </Box>
  );
};
