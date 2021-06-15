import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import { ThemeProvider } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {ItemHeader} from "./ItemHeader";
import {ItemForm} from "./ItemForm";
import {Model} from "../../views/Admin/AdminItem";
import {ItemSubmit} from "./ItemSubmit";
import {ItemSpecification} from "./ItemSpecification";
import {createProduct, getProduct, modifyProduct} from "../../services/productService";
import {addProductsToCategory, getCategories} from "../../services/categoryService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export interface Specification {
  items: Array<{key: string, val: string}>
  setValue: (v: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: 'key' | 'val', index: number) => void,
  deleteValue: (i: number) => void
}

export const Product: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const [values, setValues] = useState({id: "", name: "", price: 0, amount: 0, description: "", category: ""});
  const [specification, setSpecification] = useState<Array<{key: string, val: string}>>([{key: "", val: ""}])
  const [categories, setCategories] =  useState<Array<{label: string, value: string}>>([]);

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
        xs: 6,
        items: [
          {
            label: "Nazwa produktu",
            required: true,
            value: values.name,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'name': v.target.value}),
          },
          {
            label: "Kategoria",
            value: values.category,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'category': v.target.value}),
            options: categories
          },
          {
            label: "Cena (w groszach)",
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
            label: "Nazwa produktu",
            required: true,
            value: values.name,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'name': v.target.value}),
          },
          {
            label: "Kategoria",
            value: values.category,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'category': v.target.value}),
            options: categories
          },
          {
            label: "Cena (w groszach)",
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

  const onSubmit = async () => {
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
      await createProduct(input).then(async id => {
        await addProductsToCategory(values.category, [id]);
      })
    }

    if(operation === 'modifying') {
      const id = query.get('id');
      if(!id) throw new Error('No id found');
      let spec = specification.filter(el => (el.key !== "" && el.val !== ""))
      let input = {
        name: values.name,
        description: values.description,
        amount: values.amount,
        price: values.price,
        category: values.category,
        specification: spec
      };
      await modifyProduct(id, input).then(async (d) => {
        if(!d.ok) {
          console.error(await d.json());
        }
      })
    }

    history.goBack();
  }

  const onAdd = () => {
    const temp = [...specification];
    temp.push({key: "", val: ""})
    setSpecification([...temp])
  }

  useEffect(() => {
    getCategories().then(data => {
      const temp = [{label: "Brak", value: ""}];
      data.forEach(c => {
        temp.push({label: c.categoryName, value: c.categoryName})
      })
      setCategories(temp);
    })

    if (operation === 'modifying') {
      const id = query.get('id');
      if(id) {
        getProduct(id).then(p => {
          setValues({
            ...values,
            'id': id,
            'name': p.product.name,
            'amount': p.product.amount ? p.product.amount : values.amount,
            'price': p.product.price ? p.product.price : values.price,
            'description': p.product.description ? p.product.description : values.description,
            'category': p.category ? p.category : values.category
          })
          setSpecification(p.product.specification ? p.product.specification : [...specification])
        })
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ItemHeader type="Produkt" />
      <ItemForm model={CompanyModel} operation={operation} />
      <ItemSpecification spec={SpecificationModel} handleAdd={onAdd} />
      <ItemSubmit submit={onSubmit} />
    </ThemeProvider>
  )
})