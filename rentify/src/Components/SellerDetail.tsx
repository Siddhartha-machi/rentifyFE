import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

import { authLayout } from "../CSS/auth";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import CandlestickChartRoundedIcon from "@mui/icons-material/CandlestickChartRounded";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";

import { sDetail } from "../CSS/sellerDetail";
import { main } from "../CSS/colors";
import { APIRequest } from "../API/requests";
import { resolveReq, sendMail } from "../helpers";
import { UserType, setEnableSellerDetail } from "../Redux/Slices/appslice";
import { EmailJSResponseStatus } from "@emailjs/browser";
import { toast } from "react-toastify";

type detailItemProps = {
  Icon: React.ElementType;
  label?: string;
  val: string;
  color?: string;
  bold?: boolean;
};

const DetailItem = (props: detailItemProps) => {
  const { Icon, label, color, bold, val } = props;
  return (
    <Box sx={{ ...sDetail.itemBox, color }}>
      <Icon sx={{ color: "inherit" }} />
      {label && <Typography sx={sDetail.itemLabel}>{label} :</Typography>}
      <Typography
        sx={{ ...sDetail.itemLabel, fontWeight: bold ? "bold" : "regular" }}
      >
        {val}
      </Typography>
    </Box>
  );
};

const SellerDetail = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState(0);
  const { sellerDetail, propData, user } = useAppSelector((store) => store.app);
  const [seller, setSeller] = React.useState<UserType | null>(null);
  const [error, setError] = React.useState("");

  const selectedProp = React.useMemo(() => {
    return propData[sellerDetail.context[1]];
  }, [propData, sellerDetail.context]);

  const closeDialog = () => {
    dispatch(
      setEnableSellerDetail({
        enable: false,
        context: [],
      })
    );
  };

  const fetchSeller = React.useCallback(async () => {
    setLoading(1);
    const client = new APIRequest();
    const res = await client.get(`users/${sellerDetail.context[0]}`);
    const result = resolveReq(res);
    if (result.success) {
      setSeller(result.data);
      setError("");
    } else {
      setError(result.error);
    }
    setLoading(0);
  }, [sellerDetail.context]);

  const handleMailSend = async () => {
    setLoading(2);
    if (seller) {
      const res: EmailJSResponseStatus = await sendMail(
        user,
        seller,
        selectedProp.property_name
      );
      if (res?.status === 200) {
        toast.success("Seller Details send to your registered email id.");
      } else if (res.status === 500) {
        toast.warning(
          "Email service is disabled. Please contact rentify admin."
        );
      } else {
        toast.error("Couldn't send email. Please try again after sometime.");
      }
    }
    setLoading(0);
  };

  React.useEffect(() => {
    fetchSeller();
  }, [fetchSeller]);

  if (loading === 1) {
    return (
      <Card
        elevation={24}
        sx={{ ...authLayout.container, ...authLayout.loadingContainer }}
      >
        <CircularProgress sx={authLayout.loader} />
        <Typography sx={authLayout.loadingText}>
          Fetching seller details..
        </Typography>
      </Card>
    );
  }
  if (seller) {
    return (
      <Card elevation={24} sx={authLayout.container}>
        <IconButton
          sx={sDetail.closeIcon}
          onClick={closeDialog}
          disableTouchRipple
        >
          <CloseRoundedIcon />
        </IconButton>
        <Typography sx={authLayout.formTitle}>Seller Details</Typography>
        <Box>
          <Divider textAlign="left">
            <DetailItem
              Icon={CandlestickChartRoundedIcon}
              val="Demographics"
              color={main}
              bold
            />
          </Divider>

          <Box sx={sDetail.sectionBox}>
            <DetailItem
              Icon={ApartmentRoundedIcon}
              val={selectedProp?.property_name}
              label="Property Name"
            />
            <DetailItem
              Icon={AccountBoxRoundedIcon}
              label="Seller Name"
              val={seller.first_name + " " + seller.last_name}
            />
            <DetailItem
              Icon={HandshakeRoundedIcon}
              label="Seller since"
              val={`${new Date(seller.date_joined).getFullYear()}`}
            />
          </Box>

          <Divider textAlign="right">
            <DetailItem
              Icon={ContactsRoundedIcon}
              val="Contact info"
              color={main}
              bold
            />
          </Divider>

          <Box sx={sDetail.sectionBox}>
            <DetailItem
              Icon={EmailRoundedIcon}
              label="Email"
              val={seller.email}
            />
            <DetailItem
              Icon={PhoneRoundedIcon}
              label="Phone"
              val={seller.contact}
            />
          </Box>
          <Button
            onClick={handleMailSend}
            disabled={loading === 2}
            fullWidth
            sx={authLayout.submitButton}
          >
            {loading === 2 ? "Sending mail" : "Request a copy through mail"}
          </Button>
        </Box>
      </Card>
    );
  }
  return (
    <Card
      elevation={24}
      sx={{ ...authLayout.container, ...authLayout.loadingContainer }}
    >
      <IconButton
        sx={sDetail.closeIcon}
        onClick={closeDialog}
        disableTouchRipple
      >
        <CloseRoundedIcon />
      </IconButton>
      <Typography sx={sDetail.errorTxt}>
        {error || "We messed up! please try again sometime later."}
      </Typography>
    </Card>
  );
};

export default SellerDetail;
