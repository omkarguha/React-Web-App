import Navbar from './Componensts/Navbar.jsx';
import NotFound from './Componensts/NotFound.jsx';
import { IoMdSearch } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect } from 'react';
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from './config/firebase.js';
import { useState} from "react";
import {HiOutlineUserCircle} from "react-icons/hi";
import {IoMdTrash} from "react-icons/io";
import {RiEditCircleLine} from "react-icons/ri";
import ContactCard from './Componensts/ContactCard.jsx';
import Modal from './Componensts/Modal.jsx'
import AddAndUpdate from './Componensts/AddAndUpdate.jsx';
import useDisclouse from './Hooks/useDisclouse.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [contacts,setContacts]=useState([]);
  const {isOpen, onClose, onOpen} = useDisclouse();

  useEffect(()=>{
    const getContacts =async ()=>{
      try {
        const contactsRef = collection(db,"contact");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactList = snapshot.docs.map((doc)=>{
            return {
              id:doc.id,
              ...doc.data(),
            }
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  },[]);


  const filterContacts =(e)=>{
    const value=e.target.value;
    const contactsRef = collection(db,"contact");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactList = snapshot.docs.map((doc)=>{
            return {
              id:doc.id,
              ...doc.data(),
            };
          });
          
          const filteredContact = contactList.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()));
          setContacts(filteredContact);
          return filteredContact;
        });
  }



  return (
    <>
      <div className="mx-auto max-w-[370px]">
        <Navbar/>

        <div className='flex gap-2'>
          <div className='flex relative items-center flex-grow'>
            <IoMdSearch className="text-white text-3xl absolute ml-2"/>
            <input onChange={filterContacts} type="text" className="h-10 border bg-transparent border-white rounded-md text-white flex-grow px-4 text-xl pl-12 outline-none" placeholder='Search Contact'/>
          </div>
          <FaPlusCircle className='text-5xl text-white cursor-pointer' onClick={onOpen}/>
        </div>

        <div>
          {contacts.length<=0 ? <NotFound/> : contacts.map((contact)=>(<ContactCard key={contact.id} contact={contact}/>))}
        </div>
        <AddAndUpdate onClose={onClose} isOpen={isOpen}/>
        <ToastContainer position='bottom-center'/>
      </div>

    </>
  )
}

export default App;
