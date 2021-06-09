import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import { ThemeProvider } from "@material-ui/core";
import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {ItemHeader} from "./ItemHeader";
import {ItemForm} from "./ItemForm";
import {Model} from "../../views/Admin/AdminItem";
import {ItemSubmit} from "./ItemSubmit";
import {ItemSpecification} from "./ItemSpecification";
import {createCompany, modifyCompany} from "../../services/companySevice";
import {createProduct} from "../../services/productService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export interface Specification {
  items: Array<{key: string, val: string}>
  setValue: (v: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'key' | 'val', index: number) => void,
  deleteValue: (i: number) => void
}

export const Product: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const [values, setValues] = useState({id: "", name: "", price: 0, amount: 0, description: ""});
  const [specification, setSpecification] = useState<Array<{key: string, val: string}>>([{key: "1", val: "1"}, {key: "2", val: "2"}])

  let history = useHistory();
  let query = useQuery();

  const SpecificationModel: Specification = {
    items: specification,
    setValue: (v: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'key' | 'val', index: number) => {
      const temp = [...specification];
      temp[index][type] = v.target.value;
      setSpecification([...temp])
    },
    deleteValue: (index: number) => {
      const temp = [...specification];
      temp.splice(index, 1);
      setSpecification([...temp]);
    }
  }

  const CompanyModel: Model = {
    create: [
      {
        groupName: "Główne informacje",
        xs: 4,
        items: [
          {
            label: "Nazwa produktu",
            required: true,
            value: values.name,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'name': v.target.value}),
          },
          {
            label: "Cena",
            required: true,
            value: values.price,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'price': parseFloat(v.target.value)}),
            type: "number"
          },
          {
            label: "Ilość",
            required: true,
            value: values.amount,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'amount': parseInt(v.target.value)}),
            type: "number"
          },
        ]
      },
      {
        groupName: "Opis produktu",
        xs: 12,
        items: [
          {
            label: "Opis",
            value: values.description,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'description': v.target.value}),
          },
        ],
      }
    ],
    modify: [
      {
        groupName: "Główne informacje",
        xs: 6,
        items: [
          {
            label: "ID produktu",
            disabled: true,
            value: values.id,
          },
          {
            label: "Nazwa produktu",
            required: true,
            value: values.name,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'name': v.target.value}),
          },
          {
            label: "Cena",
            required: true,
            value: values.price,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'price': parseFloat(v.target.value)}),
            type: "number"
          },
          {
            label: "Ilość",
            required: true,
            value: values.amount,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'amount': parseInt(v.target.value)}),
            type: "number"
          },
        ]
      }
    ]
  }

  const onSubmit = () => {
    if(!values.name || values.name === "") {
      return;
    }

    if(operation === 'creating') {
      let spec = specification.filter(el => (el.key !== "" && el.val !== ""))
      let input = {
        name: values.name,
        description: values.description,
        amount: values.amount,
        price: values.price,
        specification: spec
      };
      createProduct(input);
      return;
    }

    if(operation === 'modifying') {

      return;
    }
  }

  const onAdd = () => {
    const temp = [...specification];
    temp.push({key: "", val: ""})
    setSpecification([...temp])
  }

  return (
    <ThemeProvider theme={theme}>
      <ItemHeader type="Produkt" />
      <ItemForm model={CompanyModel} operation={operation} />
      <ItemSpecification spec={SpecificationModel} handleAdd={onAdd} />
      <ItemSubmit submit={onSubmit} />
    </ThemeProvider>
  )
});