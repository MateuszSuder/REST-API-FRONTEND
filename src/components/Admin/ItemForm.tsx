import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Button, Grid, MenuItem, TextField, ThemeProvider, Typography} from "@material-ui/core";
import React from "react";
import {adminItemStyles, Model} from "../../views/Admin/AdminItem";

export const ItemForm: IReactComponent = observer(({model, operation}: {model: Model, operation: 'creating' | 'modifying'}) => {
	const classes = adminItemStyles();

	return(
		<ThemeProvider theme={theme}>
			{
				(operation === 'creating' ? model.create : model.modify).map((group, i) => (
					<React.Fragment key={i}>
						<Grid item xs={12} className={classes.subTitle}>
							<Typography>{group.groupName}</Typography>
						</Grid>
						{
							group.items.map((item, i) => (
								<Grid item xs={group.xs} key={i}>
									{
										item.options &&
                    <TextField
                        select
                        label={item.label}
                        value={item.value}
                        onChange={item.setValue}
                        className={classes.input}
                        disabled={item.disabled}
                    >
											{
												item.options.map((opt, i) => (
													<MenuItem value={opt.value} key={i}>
														{opt.label}
													</MenuItem>
												))
											}
                    </TextField>
									}
									{
										!item.options &&
                    <TextField
                        label={item.label}
                        value={item.value}
                        onChange={item.setValue}
                        disabled={item.disabled}
                        className={classes.input}
												type={item.type ? "number" : "text"}
                    />
									}
								</Grid>
							))
						}
					</React.Fragment>
				))
			}
		</ThemeProvider>
	)
})