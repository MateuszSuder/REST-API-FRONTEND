import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {Grid, MenuItem, TextField, ThemeProvider, Typography} from "@material-ui/core";
import {adminItemStyles, Model, ModelOption} from "../../views/Admin/AdminItem";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Company, getCompanies} from "../../services/companySevice";
import React from "react";
import {ItemForm} from "./ItemForm";
import {ItemHeader} from "./ItemHeader";

export const User: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const [values, setValues] = useState({userID: "", username: "", permission: "user", company: {ID: "", name: ""}});
  const [companies, setCompanies] = useState<Array<Company>>([{id: "1", name: "1n"}, {id: "2", name: "2n"}]);

  const fetchCompanies = () => {
    getCompanies().then(data =>
      setCompanies(data)
    )

    const res: Array<ModelOption> = companies.map(company => (
      {
        'label': company.name,
        'value': company.name
      }
    ))

    return res;
  }

  const findCompanyID = (n: string) => {
    const res = companies.find(c => c.name === n);
    if(res) {
      return res.id;
    }

    return "";
  }

  const UserModel: Model = {
    create: [
      {
        groupName: "Użytkownik",
        xs: 6,
        items: [
          {
            label: "Nazwa użytkownika",
            value: values.username,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'username': v.target.value})
          }
        ]
      }
    ],
    modify: [
      {
        groupName: "Użytkownik",
        xs: 6,
        items: [
          {
            label: "Nazwa użytkownika",
            value: values.userID,
            disabled: true
          },
          {
            label: "Prawa użytkownika",
            value: values.permission,
            required: true,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'permission': v.target.value}),
            options: [
              {
                label: "Użytkownik",
                value: "user"
              },
              {
                label: "Administrator",
                value: "admin"
              }
            ]
          }
        ]
      },
      {
        groupName: "Firma użytkownika",
        xs: 6,
        items: [
          {
            label: "ID firmy",
            value: values.company.ID,
            disabled: true
          },
          {
            label: "Nazwa Firmy",
            value: values.company.name,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
              ...values,
              'company': {ID: findCompanyID(v.target.value), name: v.target.value}
            }),
            options: fetchCompanies()
          }
        ]
      }
    ]
  }

  useEffect(() => {
    console.log(values);
  }, [values])

  const onSubmit = () => {
    console.log('Submit!');
  }

  return (
    <ThemeProvider theme={theme}>
      <ItemHeader type="Użytkownik" />
      <ItemForm model={UserModel} operation={operation} submit={onSubmit} />
    </ThemeProvider>
  );
})