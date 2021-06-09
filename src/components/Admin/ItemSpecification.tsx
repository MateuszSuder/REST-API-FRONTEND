import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Grid, TextField, ThemeProvider, Typography} from "@material-ui/core";
import {adminItemStyles} from "../../views/Admin/AdminItem";
import {Specification} from "./Product";
import React from "react";

export const ItemSpecification: IReactComponent = observer(({spec}: {spec: Specification}) => {
	const classes = adminItemStyles();

	return (
		<ThemeProvider theme={theme}>
			<Grid item xs={12} className={classes.subTitle}>
				<Typography>
					Specyfikacja
				</Typography>
			</Grid>
			{
				spec &&
					spec.items.map((s, i) => (
						<React.Fragment key={i}>
							<Grid item xs={6}>
								<TextField
									value={s.key}
									onChange={(e) => spec.setValue(e, 'key', i)}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									value={s.val}
									onChange={(e) => spec.setValue(e, 'val', i)}
								/>
							</Grid>
						</React.Fragment>
					))
			}
		</ThemeProvider>
	)
});