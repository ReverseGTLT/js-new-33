import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./index.module.css";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string()
        .required("Required")
        .matches(phoneRegExp, "Please enter a valid mobile number.")
        .length(12, "This field has to be exactly 12 characters!"),
});

export default function ContactForm() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    id="name"
                />
                <Error value={formik.errors.name} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    id="email"
                />
                <Error value={formik.errors.email} />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    id="phone"
                />
                <Error value={formik.errors.phone} />
            </div>

            <button type="button">Submit</button>
        </form>
    );
}

function Error({ value }) {
    return value ? <div className={styles.error}>{value}</div> : null;
}
