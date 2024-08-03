import { t } from "i18next";
import * as yup from "yup";

export const CHECKOUT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(t("validations.emailInvalid"))
    .required(t("validations.emailRequired")),
  country: yup
    .object()
    .shape({
      name: yup.string().required(),
      code: yup.string().required(),
    })
    .nullable(),
  firstName: yup.string().required(t("validations.firstNameRequired")),
  lastName: yup.string().required(t("validations.lastNameRequired")),
  address: yup.string().required(t("validations.addressRequired")),
  apartment: yup.string().required(t("validations.apartmentRequired")),
  city: yup.string().required(t("validations.cityRequired")),

  state: yup
    .object()
    .shape({
      name: yup.string().required(),
      code: yup.string().required(),
    })
    .nullable()
    .required(t("validations.stateRequired")),

  zip: yup.number().required(t("validation.zipCodeRequired")),
});

export const QUERY_KEYS = {
  PRODUCTS: "products",
  CHECKOUT: "checkout",
  COUNTRIES: "countries",
  STATES: "states",
};
