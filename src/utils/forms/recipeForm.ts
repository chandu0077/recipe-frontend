import * as yup from "yup";

export const recipeForm = yup.object().shape({
  _id: yup.string().trim().notRequired(),
  title: yup.string().trim().min(2).required("This field can't be empty"),
  description: yup.string().min(50).required("This field can't be empty"),
  cuisine: yup.string().trim().required("This field can't be empty."),
});
