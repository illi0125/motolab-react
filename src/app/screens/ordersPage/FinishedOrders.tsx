import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import type { Order, OrderItem } from "../../../lib/types/order";
import type { Motorcycle } from "../../../lib/types/motorcycle";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders }),
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value={"3"}>
      <Stack spacing={3}>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <div className={"order-card-header"}>
                <span className={"order-id-tag"}>
                  DISPATCH ID: #{order._id.slice(-6).toUpperCase()}
                </span>
                <span className={"order-status-badge finished"}>
                  <CheckCircleIcon sx={{ fontSize: 13 }} /> COMPLETED
                </span>
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
              </Box>
            </Box>
          );
        })}

        {(!finishedOrders || finishedOrders.length === 0) && (
          <Box className={"empty-orders-state"}>
            <img
              src={"/icons/noimage-list.svg"}
              alt="No Finished Orders"
              className={"empty-orders-img"}
            />
            <p className={"empty-text"}>
              No completed orders in telemetry history.
            </p>
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
