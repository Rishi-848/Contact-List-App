import { useState } from "react";

const API_URL = "https://contact-list-app-s0p3.onrender.com";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };

    // 👇 Decide URL + method based on whether we are updating or creating
    const url = updating
      ? `${API_URL}/update_contact/${existingContact.id}`
      : `${API_URL}/create_contact`;

    const options = {
      method: updating ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (response.status !== 201 && response.status !== 200) {
      const resData = await response.json();
      alert(resData.message);
    } else {
      // optional: clear form on create
      if (!updating) {
        setFirstName("");
        setLastName("");
        setEmail("");
      }
      updateCallback();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName"> First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName"> Last Name :</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email"> Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default ContactForm;