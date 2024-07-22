import {ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import {collection, addDoc, doc, updateDoc} from "firebase/firestore";
import {db} from '../config/firebase';
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is Required"),
    email:Yup.string().email("Invalid Email").required("Email is Required"),
})

const AddAndUpdate = ({isOpen, onClose, isUpdate,contact}) => {
    const addContact =async (contact)=>{
        try {
            const contactRef = collection(db,"contact");
            await addDoc(contactRef,contact);
            toast.success("Contact Added Successfully");
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const updateContact =async (contact,id)=>{
        try {
            const contactRef = doc(db,"contact",id);
            await updateDoc(contactRef,contact);
            toast.success("Contact Updated Successfully");
            onClose();
        } catch (error) {
            console.log(error);
        }
    }





  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} >
        <Formik validationSchema={contactSchemaValidation} initialValues={isUpdate?{name:contact.name,email:contact.email,}:{name:"",email:"",}} onSubmit={(values)=>{isUpdate ? updateContact(values, contact.id): addContact(values); }  }>
            <Form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">
                        Name
                    </label>
                    <Field name="name" className="outline-none border h-10 pl-2"/>
                    <div className="text-xs text-red-500">
                        <ErrorMessage name="name"/>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">
                        Email
                    </label>
                    <Field type="email" name="email" className="outline-none border h-10 pl-2"/>
                    <div className="text-xs text-red-500">
                        <ErrorMessage name="email"/>
                    </div>
                </div>
                <button className="bg-orange px-3 py-1.5 border self-end">{isUpdate? "Update":"Add Contact"}</button>
            </Form>
        </Formik>
      </Modal>
    </div>
  )
}

export default AddAndUpdate;
