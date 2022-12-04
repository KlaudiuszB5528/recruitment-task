import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { PeopleContext } from "../context/people";
import { useNavigate } from "react-router-dom";

interface IFormValues {
  login: string;
  password: string;
  email: string;
  phone: string;
  accept: boolean;
}

const Form = () => {
  const navigate = useNavigate();
  const { people } = useContext(PeopleContext);
  const star_wars_data = [
    Object.entries(people).map(([key, person]) => {
      const { name, created, vehicles } = person;
      return {
        name,
        created,
        vehicles,
      };
    }),
  ];
  const handlePOST = async (data: IFormValues) => {
    const combinedData = { star_wars_data, data };
    await fetch(`http://example/`, {
      method: `POST`,
      body: JSON.stringify(combinedData),
      headers: { "Content-Type": "application/json" },
    });
  };

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      email: "",
      phone: "",
      accept: false,
    },

    validationSchema: Yup.object({
      login: Yup.string()
        .max(20, "Login nie powinien być dłuższy niż 20 znaków")
        .required("Proszę podaj login"),
      password: Yup.string()
        .min(6, "Hasło powinno mieć więcej niż 6 znaków")
        .required("Proszę podaj hasło"),
      email: Yup.string()
        .email("Nieprawidłowy format adresu e-mail")
        .required("Proszę podaj e-mail"),
      phone: Yup.string()
        .min(9, "Nieprawidłowy numer telefonu")
        .max(9, "Nieprawidłowy numer telefonu")
        .typeError("Nieprawidłowy numer telefonu")
        .required("Proszę podaj numer telefonu"),
      accept: Yup.boolean().oneOf([true], "Wymagana akceptacja regulaminu"),
    }),

    onSubmit: (values, { resetForm }) => {
      handlePOST(values);
      resetForm();
      navigate("/recruitment-task/");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="registration-form">
      <div className="input-container">
        <label htmlFor="login">Login:</label>
        <input
          type="text"
          id="login"
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="form-error">
          {formik.errors.login && formik.touched.login
            ? formik.errors.login
            : ""}
        </p>
      </div>
      <div className="input-container">
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="form-error">
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : ""}
        </p>
      </div>
      <div className="input-container">
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="form-error">
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : ""}
        </p>
      </div>
      <div className="input-container">
        <label htmlFor="phone">Numer telefonu:</label>
        <input
          type="tel"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p className="form-error">
          {formik.errors.phone && formik.touched.phone
            ? formik.errors.phone
            : ""}
        </p>
      </div>
      <div className="input-container-checkbox">
        <input
          type="checkbox"
          id="accept"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="accept">Akceptuję Regulamin</label>
        <p className="form-error">
          {formik.errors.accept && formik.touched.accept
            ? formik.errors.accept
            : ""}
        </p>
      </div>
      <button type="submit" className="form-btn">
        zapisz
      </button>
    </form>
  );
};

export default Form;
