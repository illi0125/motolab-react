import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import PaymentIcon from "@mui/icons-material/Payment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import type {
  Order,
  OrderItem,
  OrderUpdateInput,
} from "../../../lib/types/order";
import type { Motorcycle } from "../../../lib/types/motorcycle";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import {
  sweetConfirmHandler,
  sweetDeleteConfirmHandler,
  sweetErrorHandling,
} from "../../../lib/sweetAlert";
import type { T } from "../../../lib/types/common";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** HANDLERS **/
  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.currentTarget.value || e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = await sweetConfirmHandler(
        "Do you want to proceed with payment?",
        "Yes, proceed",
        "Cancel",
      );

      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.currentTarget.value || e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = await sweetDeleteConfirmHandler(
        "Do you want to delete the order?",
        "This action cannot be undone.",
      );

      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={"1"}>
      <Stack spacing={3}>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <div className={"order-card-header"}>
                <span className={"order-id-tag"}>
                  DISPATCH ID: #{order._id.slice(-6).toUpperCase()}
                </span>
                <span className={"order-status-badge paused"}>PAUSED</span>
              </div>

              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Motorcycle = order.productData.filter(
                    (ele: Motorcycle) => item.productId === ele._id,
                  )[0];
                  const imagePath = `${serverApi}/${product?.motorcycleImages?.[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <div className={"order-item-media"}>
                        <img
                          src={imagePath}
                          className={"order-dish-img"}
                          alt={product?.motorcycleName || "Motorcycle"}
                        />
                      </div>

                      <p className={"title-dish"}>{product?.motorcycleName}</p>

                      <Box className={"price-box"}>
                        <span className={"unit-price"}>${item.itemPrice}</span>
                        <CloseIcon sx={{ fontSize: 14, color: "#64748b" }} />
                        <span className={"qty-badge"}>{item.itemQuantity}</span>
                        <span className={"equals-symbol"}>=</span>
                        <span className={"subtotal-price"}>
                          ${item.itemQuantity * item.itemPrice}
                        </span>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <div className={"cost-item"}>
                    <span className={"cost-label"}>Parts Total:</span>
                    <span className={"cost-value"}>
                      ${order.orderTotal - order.orderDelivery}
                    </span>
                  </div>
                  <AddIcon sx={{ fontSize: 14, color: "#06b6d4" }} />
                  <div className={"cost-item"}>
                    <span className={"cost-label"}>Freight:</span>
                    <span className={"cost-value"}>${order.orderDelivery}</span>
                  </div>
                  <span className={"equals-symbol"}>=</span>
                  <div className={"cost-item highlight"}>
                    <span className={"cost-label"}>Grand Total:</span>
                    <span className={"cost-value grand-total"}>
                      ${order.orderTotal}
                    </span>
                  </div>
                </Box>

                <div className={"order-action-buttons"}>
                  <Button
                    value={order._id}
                    variant="contained"
                    className={"cancel-button"}
                    onClick={deleteOrderHandler}
                    startIcon={<DeleteOutlineIcon />}
                  >
                    Cancel Order
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    className={"pay-button"}
                    onClick={processOrderHandler}
                    startIcon={<PaymentIcon />}
                  >
                    Confirm & Pay
                  </Button>
                </div>
              </Box>
            </Box>
          );
        })}

        {(!pausedOrders || pausedOrders.length === 0) && (
          <Box className={"empty-orders-state"}>
            <img
              src={"/icons/noimage-list.svg"}
              alt="No Paused Orders"
              className={"empty-orders-img"}
            />
            <p className={"empty-text"}>No paused orders found in queue.</p>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
