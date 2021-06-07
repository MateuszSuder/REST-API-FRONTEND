import { observer, Observer } from 'mobx-react';
import React from 'react';
import './App.css';
import { TopBar } from './components/Header/TopBar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './views/Login/Login';
import { Admin } from './views/Admin/Admin';
import { AccountCreation } from './views/Register/AccountCreation';
import { useRootStore } from './context/context';
import { RootStore } from './stores/RootStore';
import { AdminList } from './views/Admin/AdminList';
import { AdminItem } from './views/Admin/AdminItem';

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
		  primary: "#000000",
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
						<Login store={useRootStore()} />
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
									<Admin />
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
