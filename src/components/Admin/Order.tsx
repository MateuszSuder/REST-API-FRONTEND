import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Grid, ThemeProvider, Typography} from "@material-ui/core";
import {Model} from "../../views/Admin/AdminItem";
import React, {useEffect, useState} from "react";
import {ItemHeader} from "./ItemHeader";
import {getOrder, OrderType} from "../../services/orderService";
import {useLocation} from "react-router-dom";
import {OrderSummary} from "../../views/Order/OrderSummary";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Order: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const [order, setOrder] = useState<OrderType | null>(null);
  const [status, setStatus] = useState();

  let query = useQuery();

  useEffect(() => {
    const id = query.get('id');

    if(id) {
      getOrder(id).then(r => {
        setOrder(r);
        console.log(r);
      })
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ItemHeader type="Zamówienie" />
      <OrderSummary order={order} />
      <Grid item xs={12}>
        {
          order &&
          order.status &&
            <Typography>
              {
                order.status[order.status.length - 1].status
              }
            </Typography>
        }
      </Grid>
    </ThemeProvider>
  )
});