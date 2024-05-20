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
import { logoutUser, setEnableLogin } from "../Redux/Slices/appslice";
import { gridStyles } from "../CSS/content";

const values = ["Sydeny1", "Sydeny2", "Sydeny3", "Sydeny5"];

const Header = () => {
  const { user } = useAppSelector((store) => store.app);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [loc, setloc] = React.useState("");
  const [sText, setsText] = React.useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuActionHandler = (action: string) => {
    if (action === "Signin") {
      dispatch(setEnableLogin({ enable: true }));
    } else if (action === "Logout") {
      dispatch(logoutUser());
    } else {
      // show property create dialog
    }
    handleClose();
  };

  const accountMenu = React.useMemo(() => {
    const menu = [];
    if (user.isActive) {
      menu.push("Logout");
      if (user.role === "seller") {
        menu.push("Add property");
      }
    } else {
      menu.push("Signin");
    }
    return menu;
  }, [user]);

  console.log({ loc });

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
          value={loc}
          onChange={(e) => setloc(e.target.value)}
          startAdornment={<PlaceIcon sx={searchStyles.icon} />}
          renderValue={(val: string) => loc || val || "Location"}
          MenuProps={{
            sx: gridStyles.menuSelect,
          }}
        >
          {values.map((item, index) => (
            <MenuItem
              sx={searchStyles.menuItem}
              key={`select-${index}`}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
        <>
          <InputBase
            sx={searchStyles.textBox}
            value={sText}
            onChange={(e) => setsText(e.target.value)}
            placeholder="Search for a place"
          />
          <IconButton
            disableTouchRipple
            sx={{
              bgcolor: main,
              p: 0.9,
            }}
          >
            <SearchIcon sx={{ color: "#fff" }} />
          </IconButton>
        </>
      </Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          onClick={handleClick}
          disableTouchRipple
          size="small"
          sx={searchStyles.profileIcon}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          endIcon={<KeyboardArrowDownIcon />}
        >
          <Avatar sx={searchStyles.avatar}>
            {user.first_name?.charAt(0) || "A"}
          </Avatar>
          {user.isActive && (
            <Box sx={searchStyles.userDetail}>
              <Typography sx={searchStyles.username}>
                {user.first_name} {user.last_name}
              </Typography>
              <Typography sx={searchStyles.role}>Seller</Typography>
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
