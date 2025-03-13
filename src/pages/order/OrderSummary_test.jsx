import  { useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUserObject } from "../../redux/userSlice";
import { selectCartItems } from "../../redux/cartSlice";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
 
  Button,
  Grid,
  Box,
  Divider,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { addOrder } from "../../redux/ordersSlice";

const generateOrderNumber = () => {
  return `ORD-${Math.floor(Math.random() * 100000)}`;
};

const OrderSummary = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const dispatch = useDispatch()
  const user = useSelector(selectUserObject);
  const cartItems = useSelector(selectCartItems);

  // Ukryte pola w formularzu
  useEffect(() => {
    setValue("fullName", `${user.name} ${user.surname}`);
    setValue("email", user.email);
    setValue("address", user.address);
  }, [user, setValue]);

  const fullName = watch("fullName");
  const email = watch("email");
  const address = watch("address");

  // Wyliczenie łącznej kwoty
  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  // Stan kontrolujący otwarcie/zamknięcie dialogu
  const [dialogOpen, setDialogOpen] = useState(false);

  // Funkcja uruchamiana po zatwierdzeniu w dialogu
  const handleConfirm = (data) => {
    const orderData = {
      orderNumber: generateOrderNumber(),
      ...data,
      items: cartItems,
      totalPrice,
    };
    console.log("Order Confirmed:", orderData);

    // Tutaj możesz wykonać np. zapis do bazy, dispatch do store itd.
    // ...
    //todo
    dispatch(addOrder(orderData))

    // Zamykamy dialog
    setDialogOpen(false);
  };

  // Funkcja uruchamiana po anulowaniu w dialogu
  const handleCancel = () => {
    setDialogOpen(false);
  };

  // Wywoływana w momencie kliknięcia "Place Order" 
  // zamiast od razu zapisywać, otwieramy dialog
  const handlePlaceOrderClick = (formData) => {
    // formData to dane z formularza
    // Otwieramy dialog i przekazujemy je do handleConfirm
    setDialogOpen(true);
  };

  return (
    <>
      {/* Sekcja tła z efektem blur, jeśli dialog jest otwarty */}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          p: 2,
          filter: dialogOpen ? "blur(4px)" : "none",
          transition: "filter 0.3s ease"
        }}
      >
        <form onSubmit={handleSubmit(handlePlaceOrderClick)} style={{ width: "100%" }}>
          {/* Ukryte pola */}
          <input type="hidden" {...register("fullName")} />
          <input type="hidden" {...register("email")} />
          <input type="hidden" {...register("address")} />

          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Order Summary
          </Typography>

          <Grid container spacing={2}>
            {/* Sekcja z danymi użytkownika */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Your Data
              </Typography>
              <List dense>
                <ListItem
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                    py: 0.5,
                    px: 1,
                  }}
                >
                  <ListItemText
                    primary={`Full Name: ${fullName || "No name"}`}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>

                <ListItem
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                    py: 0.5,
                    px: 1,
                  }}
                >
                  <ListItemText
                    primary={`Email: ${email || "No email"}`}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>

                <ListItem
                  sx={{
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.action.hover,
                    },
                    py: 0.5,
                    px: 1,
                  }}
                >
                  <ListItemText
                    primary={`Shipping Address: ${address || "No address"}`}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              </List>
            </Grid>

            {/* Lista produktów */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Ordered Products
              </Typography>
              {cartItems.length === 0 ? (
                <Typography color="error" variant="body1">
                  Your cart is empty
                </Typography>
              ) : (
                <List dense>
                  {cartItems.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        "&:hover": {
                          backgroundColor: (theme) => theme.palette.action.hover,
                        },
                        py: 0.5,
                        px: 1,
                      }}
                    >
                      <ListItemText
                        primary={`${item.title} x${item.quantity}`}
                        secondary={`Price: $${item.price.toFixed(2)}`}
                        primaryTypographyProps={{ fontWeight: 500 }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>

            {/* Suma zamówienia */}
            {cartItems.length > 0 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Typography
                  variant="body1"
                  sx={{ textAlign: "right", fontWeight: 600 }}
                >
                  Total: ${totalPrice.toFixed(2)}
                </Typography>
              </Grid>
            )}

            {/* Metoda płatności */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Payment Method
              </Typography>
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="paymentMethod">Payment Method</InputLabel>
                <Select
                  native
                  defaultValue="bank_transfer"
                  label="Payment Method"
                  inputProps={{
                    ...register("paymentMethod"),
                    id: "paymentMethod",
                  }}
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash_on_delivery">Cash on Delivery</option>
                </Select>
              </FormControl>
            </Grid>

            {/* Przycisk złożenia zamówienia */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                Place Order
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      {/* Dialog potwierdzenia / anulowania */}
      <Dialog
        open={dialogOpen}
        onClose={handleCancel}
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Your Order</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to place this order?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          {/* Używamy handleSubmit, by jeszcze raz odczytać dane z formularza */}
          <Button
            onClick={() => {
              // Odpalamy handleSubmit bez kolejnego renderu formularza:
              // Wyciągamy dane prosto z watch() w handleConfirm,
              // ewentualnie można w handlePlaceOrderClick zapisać je w stanie.
              const data = {
                fullName,
                email,
                address,
                paymentMethod: watch("paymentMethod") || "bank_transfer",
              };
              handleConfirm(data);
            }}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderSummary;
