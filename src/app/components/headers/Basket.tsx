import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import type { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const itemsPrice: number = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0,
  );
  const shippingCost: number = itemsPrice < 10000 ? 500 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={"hover-line motolab-basket-root"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={"basket-trigger-btn"}
      >
        <Badge
          badgeContent={cartItems.length}
          color="secondary"
          className={"basket-badge"}
        >
          <img
            src={"/icons/shopping-cart.svg"}
            alt="Cart Icon"
            className={"basket-cart-icon"}
          />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        className={"motolab-basket-menu"}
        slotProps={{
          paper: {
            elevation: 0,
            className: "motolab-basket-paper",
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 10px 30px rgba(0,0,0,0.8))",
              mt: 1.5,
              background: "#0d1117",
              border: "1px solid rgba(6, 182, 212, 0.25)",
              borderRadius: "16px",
              color: "#ffffff",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 18,
                width: 10,
                height: 10,
                bgcolor: "#0d1117",
                borderLeft: "1px solid rgba(6, 182, 212, 0.25)",
                borderTop: "1px solid rgba(6, 182, 212, 0.25)",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          {/* Menu Header */}
          <Box className={"all-check-box"}>
            {cartItems.length === 0 ? (
              <div className={"basket-empty-title"}>
                <ShoppingBagIcon sx={{ fontSize: 18, color: "#64748b" }} />
                <span>Telemetry Queue Empty</span>
              </div>
            ) : (
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <div className={"basket-header-title"}>
                  <span className={"pulse-dot"} />
                  <span>DISPATCH STAGING ({cartItems.length})</span>
                </div>
                <button
                  type="button"
                  className={"clear-all-btn"}
                  onClick={() => onDeleteAll()}
                  title="Clear All Items"
                >
                  <DeleteForeverIcon sx={{ fontSize: 18 }} />
                  <span>CLEAR</span>
                </button>
              </Stack>
            )}
          </Box>

          {/* Cart Item List Container */}
          <Box className={"orders-main-wrapper"}>
            {cartItems.length === 0 ? (
              <div className={"basket-empty-body"}>
                <p>No active motorcycle items added to dispatch yet.</p>
              </div>
            ) : (
              <Box className={"orders-wrapper"}>
                {cartItems.map((item: CartItem) => {
                  const imagePath = `${serverApi}/${item.image}`;
                  return (
                    <Box key={item._id} className={"basket-info-box"}>
                      <button
                        type="button"
                        className={"cancel-btn"}
                        onClick={() => onDelete(item)}
                        title="Remove Item"
                      >
                        <CancelIcon sx={{ fontSize: 18 }} />
                      </button>

                      <div className={"item-thumb-container"}>
                        <img
                          src={imagePath}
                          alt={item.name}
                          className={"product-img"}
                        />
                      </div>

                      <div className={"item-details"}>
                        <span className={"product-name"}>{item.name}</span>
                        <div className={"product-price-tag"}>
                          <span className={"unit-val"}>${item.price}</span>
                          <span className={"multiplier"}>x</span>
                          <span className={"qty-val"}>{item.quantity}</span>
                        </div>
                      </div>

                      <div className={"qty-control-box"}>
                        <button
                          type="button"
                          onClick={() => onRemove(item)}
                          className="remove"
                          title="Decrease Quantity"
                        >
                          <RemoveIcon sx={{ fontSize: 14 }} />
                        </button>
                        <span className={"qty-display"}>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onAdd(item)}
                          className="add"
                          title="Increase Quantity"
                        >
                          <AddIcon sx={{ fontSize: 14 }} />
                        </button>
                      </div>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>

          {/* Footer & Order Button */}
          {cartItems.length !== 0 && (
            <Box className={"basket-order"}>
              <div className={"basket-summary-row"}>
                <div className={"price-breakdown"}>
                  <span className={"breakdown-label"}>SUBTOTAL / FREIGHT</span>
                  <span className={"breakdown-val"}>
                    ${itemsPrice} + ${shippingCost}
                  </span>
                </div>
                <div className={"total-price-display"}>
                  <span className={"total-label"}>TOTAL</span>
                  <span className={"price"}>${totalPrice}</span>
                </div>
              </div>

              <Button
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
                className={"checkout-btn"}
                fullWidth
              >
                PROCEED TO DISPATCH
              </Button>
            </Box>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
