import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {observer} from "mobx-react";
import {theme} from "../../App";
import {ThemeProvider} from "@material-ui/core";
import { Model, ModelOption} from "../../views/Admin/AdminItem";
import {useEffect, useState} from "react";
import {CompanyInfo, getCompanies} from "../../services/companySevice";
import React from "react";
import {ItemForm} from "./ItemForm";
import {ItemHeader} from "./ItemHeader";
import {createUser, getUser, modifyUser} from "../../services/userService";
import {useHistory, useLocation} from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const User: IReactComponent = observer(({operation}: {operation: 'creating' | 'modifying'}) => {
  const [values, setValues] = useState({
    userID: "", username: "", permission: "user",
    companyID: "", companyName: "",
    deliveryDetails: {
      name: "", lastName: "",
      address: {
        city: "", country: "", number: "", postcode: "", street: ""
      }
    }
  });
  const [companies, setCompanies] = useState<Array<CompanyInfo>>();
  const [companiesOptions, setCompaniesOptions] = useState([{label: '', value: ''}]);

  let history = useHistory();
  let query = useQuery();

  const fetchCompanies = async () => {
    const res = await getCompanies();
    setCompanies(res);
  }

  const initCompaniesOptions = () => {

    if(!companies) return;
    const opts: Array<ModelOption> = companies.map(company => (
      {
        'label': company.name,
        'value': company.name
      }
    ))

    setCompaniesOptions(opts);
  }

  const findCompanyID = (n: string) => {
    if(companies) {
      const res = companies.find(c => c.name === n);
      if(res) {
        return res.id;
      }
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
            value: values.username,
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
            value: values.companyID,
            disabled: true
          },
          {
            label: "Nazwa Firmy",
            value: values.companyName,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
              ...values,
              'companyID': findCompanyID(v.target.value),
              'companyName': v.target.value
            }),
            options: companiesOptions
          }
        ]
      },
      {
        groupName: "Adres dostawy",
        xs: 6,
        items: [
          {
            label: "Imię",
            value: values.deliveryDetails.name,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'deliveryDetails': {...values.deliveryDetails, name: v.target.value}})
          },
          {
            label: "Nazwisko",
            value: values.deliveryDetails.lastName,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({...values, 'deliveryDetails': {...values.deliveryDetails, lastName: v.target.value}})
          },
          {
            label: "Państwo",
            value: values.deliveryDetails.address.country,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
              ...values,
              'deliveryDetails': {...values.deliveryDetails,
                address: {...values.deliveryDetails.address,
                  country: v.target.value}}})
          },
          {
            label: "Kod pocztowy",
            value: values.deliveryDetails.address.postcode,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
              ...values,
              'deliveryDetails': {...values.deliveryDetails,
                address: {...values.deliveryDetails.address,
                  postcode: v.target.value}}})
          },
          {
            label: "Miasto",
            value: values.deliveryDetails.address.city,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
              ...values,
              'deliveryDetails': {...values.deliveryDetails,
                address: {...values.deliveryDetails.address,
                  city: v.target.value}}})
          },
          {
            label: "Ulica",
            value: values.deliveryDetails.address.street,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
              ...values,
              'deliveryDetails': {...values.deliveryDetails,
                address: {...values.deliveryDetails.address,
                  street: v.target.value}}})
          },
          {
            label: "Numer domu/mieszkania (np.: 24/6)",
            value: values.deliveryDetails.address.number,
            setValue: (v: React.ChangeEvent<HTMLInputElement>) => setValues({
              ...values,
              'deliveryDetails': {...values.deliveryDetails,
                address: {...values.deliveryDetails.address,
                  number: v.target.value}}})
          },
        ]
      }
    ]
  }

  useEffect(() => {
    console.log(values);
  }, [values])

  useEffect(() => {
    console.log(companiesOptions);
  }, [companiesOptions])

  useEffect(() => {
    const id = query.get('id');
    if(id) {
      setValues({...values, userID: id})
    }
  }, [])

  useEffect(() => {
    if(values.userID !== "") {
      getUser(values.userID).then(data => {
        console.log(data);
        setValues({
          ...values,
          companyID: data.company && data.company.id ? data.company.id : values.companyID,
          companyName: data.company && data.company.name ? data.company.name : values.companyName,
          permission: data.permission,
          username: data.username,
          deliveryDetails: data.deliverDetails ? data.deliverDetails : values.deliveryDetails
        })
      })
    }
  }, [values.userID])


  useEffect(() => {
    if(!companies || (companies && companies.length === 0)) {
      fetchCompanies();
    }
    initCompaniesOptions();
  }, [companies])

  const onSubmit = () => {
    if(operation === 'creating') {
      createUser(values.username).then(r =>
        history.goBack()
      );
    }

    if(operation === 'modifying') {
      modifyUser(values.userID, {
        companyID: values.companyID ? values.companyID : undefined,
        deliveryDetails: values.deliveryDetails,
        permission: values.permission as 'user' | 'admin'
      }).then(r => history.goBack());
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ItemHeader type="Użytkownik" />
      <ItemForm model={UserModel} operation={operation} submit={onSubmit} />
    </ThemeProvider>
  );
})