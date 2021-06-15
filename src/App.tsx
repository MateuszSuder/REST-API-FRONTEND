import { observer, Observer } from 'mobx-react';
import React, {useEffect} from 'react';
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
import {ProductView} from "./views/Product/ProductView";
import {UserDetailsView} from "./views/User/UserDetailsView";
import {OrderDelivery} from "./views/Order/OrderDelivery";
import {Snackbars} from "./components/Snackbars";
import {Delivery, User} from "./services/userService";
import {ProductQuantity} from "./services/productService";
import {OrderSummary} from "./views/Order/OrderSummary";
import {UserOrdersView} from "./views/User/UserOrdersView";

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
	const store = useRootStore();

	useEffect(() => {
		let u = localStorage.getItem('user');

		if(u) {
			const user = JSON.parse(u) as User;

			if(user.id) {
				store.user.setUser(user);
			}
		} else {
			return;
		}

		let c = localStorage.getItem('cart');

		if(c) {
			const cart = JSON.parse(c) as ProductQuantity[];

			if(cart.length > 0) {
				cart.forEach(item => {
					store.cart.addToCart(item);
				})
			}
		}

		let d = localStorage.getItem('delivery');

		if(d) {
			const delivery = JSON.parse(d) as Delivery;

			store.cart.setDelivery(delivery);
		}

	}, [])

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
								<Route path="/order/delivery">
									<OrderDelivery />
								</Route>
								<Route path="/order/summary/:id">
									<OrderSummary />
								</Route>
								<Route path="/order/summary">
									<OrderSummary />
								</Route>
								<Route path="/user/:id/orders">
									<UserOrdersView />
								</Route>
								<Route path="/user/:id">
									<UserDetailsView />
								</Route>
								<Route path="/product/:productID">
									<ProductView />
								</Route>
								<Route path="/:category">
									<IndexView />
								</Route>
								<Route path="">
									<IndexView />
								</Route>
							</Switch>
							<Snackbars />
						</div>
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
})

export default App;
