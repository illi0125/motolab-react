import { useEffect, useState, type SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShieldIcon from "@mui/icons-material/Shield";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { type Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { useDispatch } from "react-redux";
import type { Order, OrderInquiry } from "../../../lib/types/order";
import "../../../css/order.css";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [
    orderInquiry,
    orderBuilder,
    setPausedOrders,
    setProcessOrders,
    setFinishedOrders,
  ]);

  /** HANDLERS **/
  const handleChange = (_e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) {
    history.push("/");
    return null;
  }

  return (
    <div className={"order-page"}>
      <Container maxWidth="xl" className="order-container">
        {/* Main Orders Display */}
        <Stack className={"order-left"}>
          <Box className={"order-header-wrapper"}>
            <div className={"category-badge-pill"}>
              <span className={"pulse-dot"} />
              <span>TELEM-ORDERS MANAGEMENT</span>
            </div>
            <h2 className={"order-title"}>
              MY <span className={"highlight-cyan"}>DISPATCH ORDERS</span>
            </h2>
          </Box>

          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="motolab order status tabs"
                className={"table_list"}
              >
                <Tab label="PAUSED ORDERS" value={"1"} disableRipple />
                <Tab label="PROCESS ORDERS" value={"2"} disableRipple />
                <Tab label="FINISHED ORDERS" value={"3"} disableRipple />
              </Tabs>
            </Box>

            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        {/* Right Sidebar: Pilot Info & Telemetry Payment Gateway */}
        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className={"order-user-avatar"}
                  alt={authMember?.memberNick || "Pilot Avatar"}
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={
                      authMember?.memberType === MemberType.ADMIN
                        ? "/icons/restaurant.svg"
                        : "/icons/user-badge.svg"
                    }
                    className={"order-user-prof-img"}
                    alt="Badge"
                  />
                </div>
              </div>

              <span className={"order-user-name"}>
                {authMember?.memberNick}
              </span>

              <div className={"user-role-pill"}>
                <ShieldIcon sx={{ fontSize: 13, color: "#06b6d4" }} />
                <span className={"order-user-prof"}>
                  {authMember?.memberType}
                </span>
              </div>
            </Box>

            <div className={"order-divider"} />

            <Box className={"order-user-address"}>
              <LocationOnIcon sx={{ fontSize: 18, color: "#ef4444" }} />
              <span className={"spec-address-txt"}>
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "No delivery address configured"}
              </span>
            </Box>
          </Box>

          <Box
            className={"order-info-box payment-card-box"}
            sx={{ mt: "20px" }}
          >
            <div className={"card-header-label"}>
              <CreditCardIcon sx={{ fontSize: 18, color: "#06b6d4" }} />
              <span>PILOT DISPATCH PAYMENT METHOD</span>
            </div>

            <div className={"card-input-wrapper"}>
              <label>CARD NUMBER</label>
              <input
                type={"text"}
                name={"cardNumber"}
                placeholder={"**** **** **** 7495"}
                className={"card-input"}
              />
            </div>

            <div className={"card-dual-row"}>
              <div className={"card-input-wrapper"}>
                <label>EXPIRY</label>
                <input
                  type={"text"}
                  name={"cardPeriod"}
                  placeholder={"07 / 28"}
                  className={"card-half-input"}
                />
              </div>
              <div className={"card-input-wrapper"}>
                <label>CVV / CVC</label>
                <input
                  type={"text"}
                  name={"cardCVV"}
                  placeholder={"010"}
                  className={"card-half-input"}
                />
              </div>
            </div>

            <div className={"card-input-wrapper"}>
              <label>CARDHOLDER NAME</label>
              <input
                type={"text"}
                name={"cardCreator"}
                placeholder={"Justin Robertson"}
                className={"card-input"}
              />
            </div>

            <div className={"cards-box"}>
              <img src={"/icons/western-card.svg"} alt="Western Union" />
              <img src={"/icons/master-card.svg"} alt="MasterCard" />
              <img src={"/icons/paypal-card.svg"} alt="PayPal" />
              <img src={"/icons/visa-card.svg"} alt="Visa" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
