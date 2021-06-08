import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import { ThemeProvider } from "@material-ui/core";
import {ItemHeader} from "./ItemHeader";
import {ItemForm} from "./ItemForm";
import React, {useEffect, useState} from "react";
import {CompanyInfo, createCompany, getCompany, modifyCompany} from "../../services/companySevice";
import {Model} from "../../views/Admin/AdminItem";
import {useHistory, useLocation} from "react-router-dom";
import {createUser, modifyUser} from "../../services/userService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Company: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const [values, setValues] = useState<CompanyInfo>({id: "", name: ""});

  let history = useHistory();
  let query = useQuery();

  const CompanyModel: Model = {
    create: [
      {
        groupName: "Firma",
        xs: 12,
        items: [
          {
            label: "Nazwa firmy",
            value: values.name,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'name': v.target.value}),
            required: true
          }
        ]
      }
    ],
    modify: [
      {
        groupName: "Firma",
        xs: 6,
        items: [
          {
            label: "ID firmy",
            value: values.id,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'id': v.target.value}),
            disabled: true
          },
          {
            label: "Nazwa firmy",
            value: values.name,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'name': v.target.value}),
            required: true
          }
        ]
      }
    ]
  }

  const onSubmit = () => {
    if(!values.name || values.name === "") {
      return;
    }

    if(operation === 'creating') {
      createCompany(values.name);
    }

    if(operation === 'modifying') {
      modifyCompany(values.id, values.name);
    }

    history.goBack();
  }

  useEffect(() => {
    const id = query.get('id');
    if (id) {
      getCompany(id).then(r => setValues({...values, id: r.id, name: r.name}));
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ItemHeader type="Firma" />
      <ItemForm model={CompanyModel} operation={operation} submit={onSubmit} />
    </ThemeProvider>
  )
});