import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Grid, TextField, ThemeProvider, Typography} from "@material-ui/core";
import {adminItemStyles} from "../../views/Admin/AdminItem";
import {Specification} from "./Product";
import React from "react";
import AddIcon from '@material-ui/icons/Add';

export const ItemSpecification: IReactComponent = observer(({spec, handleAdd}: {spec: Specification, handleAdd: () => any}) => {
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
							<Grid item xs={6} className={classes.key}>
								<TextField
									value={s.key}
									label={"Tytuł " + (i + 1)}
									onChange={(e) => spec.setValue(e, 'key', i)}
								/>
							</Grid>
							<Grid item xs={6} className={classes.val}>
								<TextField
									value={s.val}
									label={"Wartość " + (i + 1)}
									onChange={(e) => spec.setValue(e, 'val', i)}
								/>
							</Grid>
						</React.Fragment>
					))
			}
			<Grid xs={9} item className={classes.add}>
				<AddIcon color="primary" fontSize="large" onClick={handleAdd} />
			</Grid>
		</ThemeProvider>
	)
})