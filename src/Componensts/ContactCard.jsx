import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdate from "./AddAndUpdate";
import useDisclouse from "../Hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
    const {isOpen, onClose, onOpen} = useDisclouse();


    const deletecontact = async (id) => {
        try {
            await deleteDoc(doc(db, "contact", id));
            toast.success("Contact Deleted Successfully");
        } catch (error) {
            consol.log(error);
        }
    };
    return (
        <>
            <div
                key={contact.id}
                className="bg-yellow flex justify-between items-center p-2 rounded-lg mt-4"
            >
                <div className="flex gap-1">
                    <HiOutlineUserCircle className="text-orange text-5xl" />
                    <div>
                        <h2 className="text-lg font-medium">{contact.name}</h2>
                        <p className="text-sm">{contact.email}</p>
                    </div>
                </div>
                <div className="flex text-3xl gap-2">
                    <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
                    <IoMdTrash
                        onClick={() => deletecontact(contact.id)}
                        className="text-orange cursor-pointer"
                    />
                </div>
            </div>
            <AddAndUpdate isUpdate isOpen={isOpen} onClose={onClose} contact={contact}/>
        </>
    );
};

export default ContactCard;
