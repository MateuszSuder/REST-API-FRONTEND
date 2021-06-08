import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Grid, ThemeProvider, Typography} from "@material-ui/core";
import {adminItemStyles} from "../../views/Admin/AdminItem";
import {useLocation} from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export const User: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const classes = adminItemStyles();

  let query = useQuery();

  return (
    <ThemeProvider theme={theme}>
      {
        operation === 'creating' &&
          <>
              <Grid item xs={12}>
                  <Typography className={classes.type}>Użytkownik</Typography>
              </Grid>
          </>
      }
      {
        operation === 'modifying' &&
          <>
              <Grid item xs={6}>
                  <Typography className={classes.title}>ID: {query.get('id')}</Typography>
              </Grid>
              <Grid item xs={6}>
                  <Typography className={classes.type}>Użytkownik</Typography>
              </Grid>
          </>
      }
    </ThemeProvider>
  );
});