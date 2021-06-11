import { observer, Observer } from 'mobx-react';
import React from 'react';
import './App.css';
import { TopBar } from './components/Header/TopBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginView } from './views/Login/LoginView';
import { AdminView } from './views/Admin/AdminView';
import { AccountCreation } from './views/Register/AccountCreation';
import { useRootStore } from './context/context';
import { RootStore } from './stores/RootStore';
import { AdminList } from './views/Admin/AdminList';
import { AdminItem } from './views/Admin/AdminItem';
import {IndexView} from "./views/Index/IndexView";
import {CartView} from "./views/Cart/CartView";
import {ProductMain} from "./components/Product/ProductMain";

export interface props {
	store: RootStore
}

export const theme = createMuiTheme({
	palette: {
	  primary: {
		main: '#80d8ff',
	  },
	  secondary: {
		main: '#82b1ff',
	  },
	  text: {
		  primary: "#171717",
		  secondary: '#000000'
	  }	
	},
});

const App = observer(() => {

	return (
		<Router>
			<ThemeProvider theme={theme}>
				<Switch>
					<Route path="/login">
						<LoginView store={useRootStore()} />
					</Route>
					<Route path="/register">
						<AccountCreation />
					</Route>
					<Route path="/">
						<div className="App">
							<TopBar store={useRootStore()} />
							<Switch>
								<Route path="/admin/:adminType/*">
									<AdminItem />
								</Route>
								<Route path="/admin/*">
									<AdminList />
								</Route>
								<Route path="/admin">
									<AdminView />
								</Route>
								<Route path="/cart">
									<CartView />
								</Route>
								<Route path="/product/:productID">
									<ProductMain />
								</Route>
								<Route path="/:category">
									<IndexView />
								</Route>
							</Switch>
						</div>
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
})

export default App;
