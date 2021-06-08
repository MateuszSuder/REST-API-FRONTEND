import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import { ThemeProvider } from "@material-ui/core";

export const Company: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  return (
    <ThemeProvider theme={theme}>
      Company
    </ThemeProvider>
  )
});