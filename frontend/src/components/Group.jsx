import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { apiRegisterGroup, apiFindGroupByName } from '../api/nogoogleauth.api';

const CreateGroup = ({setStatus}) => {
  const [sendStatus, setSendStatus] = useState(false);
  const [created, setCreated] = useState(false);
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({
    name: 'Please, fill out the name field!',
    description: 'Please, fill out the description field!',
  });

  const handleChange = async (event) => {
    const {name, value} = event.target;

    let updatedErrors = errors

    switch (name) {
      case 'name': 
        if (value.length < 5) {
          updatedErrors.name = 'The name must be 5 characters length!'
        } else {
          let answer = await apiFindGroupByName(name,value)
          if ( answer === 204 ) {
            updatedErrors.name = 'Reserved group name.'
          } else {
            updatedErrors.name = '';
          }
        }
        setName(value);
        break;
      case 'description': 
        if (value.length < 5) {
          updatedErrors.description = 'The description must be 5 characters length!'
        } else {
          updatedErrors.description = '';
        }
        setDescription(value);
        break;
      default:
        break;
    }
    setSendStatus(true)
    for (let item in updatedErrors) {
      if (updatedErrors[item]) setSendStatus(false)
    }
    setErrors({
      ...updatedErrors
    })
  };

  const registerGroup = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRegisterGroup(e.target.elements);
      if (response.data) {
        if (response.status === 200) {
          setName("");
          setDescription("");
          setCreated(true);
        } else {
          setStatus(response.status);
        }
      } else {
        if (response.status) {
          setStatus(response.status);
        } else {
          setStatus("networkError");
        }
      }
    } catch(error) {
      setStatus(909);
    }
  }

  return (
    <>
    { created ?
      <section>
        <h2>Congratulations!</h2>
        <p>You have successfully registered the group.</p>
      </section>
    :
      <>
      <h2>Register group data</h2>
      <form onSubmit={registerGroup} id="contactForm">
        <div className="errorMessage">{errors.name || " "}</div>
        <TextField type="text" id="name" name="name" label="Name " variant="outlined" value={name} onChange={handleChange} required className="formField TextField" />

        <div className="errorMessage">{errors.description || " "}</div>
        <TextField type="text" id="description" name="description" label="Description " variant="outlined" value={description} onChange={handleChange} required className="formField TextField" />

        <div className="errorMessage"> </div>
        <Button variant="outlined" type="submit" disabled={!sendStatus}>Save</Button>
      </form>
      </>
    }
    </>
  );
};

export default CreateGroup;