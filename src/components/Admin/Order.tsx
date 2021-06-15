import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Button, Container, Grid, MenuItem, Select, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {ItemHeader} from "./ItemHeader";
import {changeOrderStatus, getOrder, OrderStatus, OrderType} from "../../services/orderService";
import {useHistory, useLocation} from "react-router-dom";
import {OrderSummary} from "../../views/Order/OrderSummary";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const statusValues = [
  OrderStatus.Ordered,
  OrderStatus.PaymentDone,
  OrderStatus.Shipped,
  OrderStatus.Delivered
]

const statuses = [
  {
    label: "Zamówione",
    value: statusValues[0]
  },
  {
    label: "Opłacone",
    value: statusValues[1]
  },
  {
    label: "Wysłane",
    value: statusValues[2]
  },
  {
    label: "Dostarczone",
    value: statusValues[3]
  },

]

export const Order: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const [order, setOrder] = useState<OrderType | null>(null);
  const [status, setStatus] = useState<OrderStatus>(OrderStatus.Ordered);

  const history = useHistory();
  let query = useQuery();


  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as OrderStatus);
  }

  const isDisabled = (val: OrderStatus):boolean => {
    if(!order) return false
    return statusValues.indexOf(val) < statusValues.indexOf(order.status[order.status.length - 1].status);
  }

  const updateStatus = () => {
    const id = query.get('id');

    if(id) {
      changeOrderStatus(id, status)
    }

    history.goBack();
  }

  useEffect(() => {
    const id = query.get('id');

    if(id) {
      getOrder(id).then(r => {
        setOrder(r)
        setStatus(r.status[r.status.length - 1].status)
      })
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ItemHeader type="Zamówienie" />
      <OrderSummary order={order} />
      <Container>
        <Grid container>
          <Grid item xs={6}>
            {
              order &&
              order.status &&
                <Select
                  value={status}
                  onChange={handleChange}
                  style={{width: '25%', margin: "1rem"}}
                >
                  {
                    statuses.map((s, i) => (
                      <MenuItem disabled={isDisabled(s.value)} key={i} value={s.value}>{s.label}</MenuItem>
                    ))
                  }
                </Select>
            }
          </Grid>
          <Grid item xs={6} style={{textAlign: "right"}}>
            <Button style={{margin: "1rem"}} variant="contained" color="primary" onClick={updateStatus}>Zapisz</Button>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
});