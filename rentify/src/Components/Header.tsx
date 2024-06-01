import ApartmentIcon from "@mui/icons-material/Apartment";
import PlaceIcon from "@mui/icons-material/Place";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { headerStyles, searchStyles } from "../CSS/header";
import { main } from "../CSS/colors";
import React from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
  logoutUser,
  setCurrLoc,
  setEnableLogin,
  setEnablePropAdd,
} from "../Redux/Slices/appslice";
import { gridStyles } from "../CSS/content";
import { APIRequest } from "../API/requests";
import { useSearchParams } from "react-router-dom";
import { capFirst, str } from "../helpers";
import { toast } from "react-toastify";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { user, filters } = useAppSelector((store) => store.app);
  const { data, selected } = filters.location;

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchTxt, setSearchTxt] = React.useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const changeLocation = (child: unknown) => {
    const index = (child as React.ReactElement).key?.split("-")[1];
    if (index) {
      const item = data[parseInt(index)];
      dispatch(setCurrLoc(item));
      searchParams.set("location", str(item.id));
      setSearchParams(searchParams);
    }
  };

  const addSearchTxtToQueryParams = () => {
    if (searchTxt) {
      searchParams.set("search", searchTxt);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const menuActionHandler = async (action: string) => {
    if (action === "Signin / Signup") {
      dispatch(setEnableLogin({ enable: true }));
    } else if (action === "Logout") {
      const req = new APIRequest();
      await req.logout();
      dispatch(logoutUser());
      toast.success("Logged out successfully!");
    } else {
      dispatch(setEnablePropAdd({ enable: true, context: null }));
    }
    handleClose();
  };

  const accountMenu = React.useMemo(() => {
    const menu = [];
    if (user.is_active) {
      menu.push("Logout");
      if (user.role === "seller") {
        menu.push("Add property");
      }
    } else {
      menu.push("Signin / Signup");
    }
    return menu;
  }, [user]);

  React.useEffect(() => {
    const location = searchParams.get("location");
    const sText = searchParams.get("search");
    if (location) {
      dispatch(setCurrLoc(data.find((item) => item.id === parseInt(location))));
    }
    if (sText) {
      setSearchTxt(sText);
    }
  }, [searchParams, dispatch, data]);

  return (
    <Box sx={headerStyles.container}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <ApartmentIcon fontSize="large" sx={{ color: main }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              letterSpacing: "2px",
              fontSize: "16px",
              fontWeight: "bold",
              color: main,
            }}
          >
            Rentify
          </Typography>
          <Typography sx={{ fontSize: "10px", mt: "-3px" }}>
            Your go to site for rentals
          </Typography>
        </Box>
      </Box>

      <Stack
        sx={searchStyles.container}
        direction={"row"}
        divider={<Divider orientation="vertical" variant="middle" flexItem />}
      >
        <Select
          size="small"
          sx={searchStyles.select}
          displayEmpty
          value={selected?.name || ""}
          onChange={(_, child) => changeLocation(child)}
          startAdornment={<PlaceIcon sx={searchStyles.icon} />}
          renderValue={(val: string) =>
            selected?.name || val || "All Locations"
          }
          MenuProps={{
            sx: gridStyles.menuSelect,
          }}
        >
          {data.map((item, index) => (
            <MenuItem
              sx={searchStyles.menuItem}
              key={`select-${index}`}
              value={item.name}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <>
          <InputBase
            sx={searchStyles.textBox}
            type="search"
            value={searchTxt}
            onChange={(e) => setSearchTxt(e.target.value)}
            placeholder="Search for a place"
          />
          <IconButton
            disableTouchRipple
            onClick={addSearchTxtToQueryParams}
            sx={searchStyles.searchButton}
          >
            <SearchIcon sx={{ color: "inherit" }} />
          </IconButton>
        </>
      </Stack>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          onClick={handleClick}
          disableTouchRipple
          size="small"
          sx={searchStyles.profileIcon}
          aria-haspopup="true"
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Avatar sx={searchStyles.avatar}>
            {user.first_name?.charAt(0) || "A"}
          </Avatar>
          {user.is_active && (
            <Box sx={searchStyles.userDetail}>
              <Typography sx={searchStyles.username}>
                {user.first_name} {user.last_name}
              </Typography>
              <Typography sx={searchStyles.role}>
                {capFirst(user.role)}
              </Typography>
            </Box>
          )}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            sx: headerStyles.menuContainer,
          }}
        >
          {accountMenu.map((item) => (
            <MenuItem
              sx={headerStyles.menuItem}
              key={item}
              onClick={() => menuActionHandler(item)}
            >
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
