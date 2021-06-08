import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Grid, MenuItem, TextField, ThemeProvider, Typography} from "@material-ui/core";
import {adminItemStyles, Model} from "../../views/Admin/AdminItem";
import {useLocation} from "react-router-dom";
import {useState} from "react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const User: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const [values, setValues] = useState({userID: "", username: "", permission: "user", test: "123test"});
  const classes = adminItemStyles();


  const user: Model = {
    create: [
      {
        groupName: "TEST",
        xs: 6,
        items: [
          {
            label: 'test',
            value: values.test,
            setValue: (x) => setValues(x)
          }
        ]
      }
    ],
    modify: [],
  }

  let query = useQuery();

  return (
    <ThemeProvider theme={theme}>
      {
        operation === 'creating' &&
          <>
            <Grid item xs={12}>
              <Typography className={classes.type}>Użytkownik</Typography>
            </Grid>
            {
              user.create.map(el => (
                <>
                  {
                    el.groupName &&
                    <Grid >

                    </Grid>
                  }
                </>
              ))
            }
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
            <Grid item xs={12} className={classes.subTitle}>
              <Typography>Użytkownik</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Nazwa użytkownika"
                disabled
                value={values.username}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                label="Prawa użytkownika"
                value={values.permission}
                className={classes.input}
              >
                <MenuItem value="user">
                    Użytkownik
                </MenuItem>
                <MenuItem value="admin">
                    Administrator
                </MenuItem>
              </TextField>
            </Grid>
          </>
      }
    </ThemeProvider>
  );
});