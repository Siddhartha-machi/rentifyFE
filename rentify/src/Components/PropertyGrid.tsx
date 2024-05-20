import {
  Box,
  Button,
  Card,
  Grid,
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
import img from "../assets/item.avif";
import { gridStyles, propCardStyles } from "../CSS/content";
import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setEnableLogin } from "../Redux/Slices/appslice";

const sortOptions = ["Price", "Area"];

const PropertyGrid = () => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((store) => store.app);
  const [sortType, setsortType] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setsortType(event.target.value as string);
  };

  const handleBuyerLookup = () => {
    if (!appState.user.isActive) {
      dispatch(
        setEnableLogin({
          enable: true,
          loginReason: "You need to login to view the seller details.",
        })
      );
      return;
    }
    // handle email send
  };
  const data = {
    id: 23,
    tags: [
      {
        id: 13,
        name: "Police Station",
      },
    ],
    images: [img],
    name: "Giacinto Rosselli Appartment",
    price: 1000,
    place: "Rotonda Stradivari, 47 Piano 3",
    street: "90011, Bagheria (PA)",
    bedrooms: 3,
    baths: 4,
    area: 3000,
    seller: 195,
    like: [196],
    wishlist: [196],
  };

  return (
    <Box sx={gridStyles.PropGridContainer}>
      <Box sx={gridStyles.gridHeader}>
        <Box sx={gridStyles.headerLeft}>
          <Box sx={gridStyles.headerInnerLeft}>
            <Typography sx={gridStyles.message}>
              Available for Rent in
            </Typography>
            <Typography sx={gridStyles.availableLoc}>NSW, Sydney</Typography>
          </Box>
          <Typography sx={gridStyles.availCount}>
            06 properties available
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
              <MenuItem sx={gridStyles.menuItem} key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Pagination
            count={10}
            siblingCount={0}
            boundaryCount={0}
            variant="outlined"
            sx={gridStyles.pagination}
          />
        </Box>
      </Box>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        sx={propCardStyles.gridContainer}
      >
        {Array.from(Array(6)).map((i) => (
          <Grid item xs={4} key={i}>
            <Card elevation={8} sx={propCardStyles.cardStyles}>
              <Box component={"img"} src={data.images[0]} />
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
                  <Button disableTouchRipple sx={propCardStyles.iButton}>
                    Interested
                  </Button>
                </Box>
                <Typography sx={propCardStyles.propName}>
                  {data.name}
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
                      {data.area} sq
                    </Typography>
                  </Box>
                </Box>
                <Button
                  disableTouchRipple
                  sx={propCardStyles.sellerButton}
                  fullWidth
                  onClick={handleBuyerLookup}
                >
                  Get Seller Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PropertyGrid;
