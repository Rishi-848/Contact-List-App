import { useState, useEffect } from "react";
import ContactList from "./ContactList"
import './App.css'
import ContactForm from "./ContactForm"

function App() {
  const[contacts, setContacts]=useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setcurrentContact] = useState({})
  useEffect(()=>{
    fetchContacts()
  },[])


  const fetchContacts = async() => {
    const response= await fetch("https://contact-list-app-s0p3.onrender.com/contacts")
    const data= await response.json()
    setContacts(data.contacts)
   

  };

  const closeModal=() =>{
    setIsModalOpen(false)
    setcurrentContact({})
  }

  const openCreateModal= ()=>{
    if(!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal=(contact)=>{
    if(isModalOpen) return
    setcurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate=()=>{
    closeModal()
    fetchContacts()
  }


  return( 
    <>
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
    <button onClick={openCreateModal}>Create new Contact</button>
    {isModalOpen && <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
      </div>
    </div>
}
</>
  );
  
}

export default App
