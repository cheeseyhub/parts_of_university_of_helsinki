import { useState, useEffect } from "react";
import axiosService from "./services/axiosService";
import axios from "axios";
function Filter({ filterName, handleFilter }) {
  return (
    <>
      <p>
        filter shown with{" "}
        <input type="text" value={filterName} onChange={handleFilter} />
      </p>
    </>
  );
}

function Form({
  addPerson,
  handlePersonAddition,
  handlePhoneAddition,
  newName,
  newPhoneNumber,
}) {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handlePersonAddition} />
        </div>
        <div>
          Number:{" "}
          <input value={newPhoneNumber} onChange={handlePhoneAddition} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
}

function NameAndNumberDisplay({
  newName,
  newPhoneNumber,
  personsToShow,
  Delete,
}) {
  if (personsToShow.length === 0) {
    return;
  }
  return (
    <>
      {personsToShow.map((person) => {
        if (!person.id) {
          return;
        }
        return (
          <p key={person.id}>
            {person.name}
            &nbsp;
            {person.number}
            &nbsp;
            <button
              onClick={() => {
                Delete(person);
              }}
            >
              Delete
            </button>
          </p>
        );
      })}

      <p>
        {newName} {newPhoneNumber}
      </p>
    </>
  );
}

function Notification({ message }) {
  if (message === "") {
    return null;
  }
  if (message.includes("!!!")) {
    return (
      <>
        <h1 className="error">{message}</h1>
      </>
    );
  }
  return (
    <>
      <h1 className="message">{message}</h1>
    </>
  );
}
const App = () => {
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    axiosService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState("");
  const [filterName, setfilterName] = useState("");

  const personsToShow = showAll
    ? persons
    : persons.filter((person) => person.important === true);

  function addPerson(event) {
    event.preventDefault();
    const personObject = {
      name: newName.trim(),
      number: newPhoneNumber.toString().trim(),
    };

    const sameNameEntry =
      persons.length > 0
        ? persons.some((person) => person.name === newName.trim())
        : false;

    if (sameNameEntry) {
      if (
        window.confirm(
          `${newName} is  already in the phonebook.Would you like to update the number`
        )
      ) {
        const sameNamed = persons.filter(
          (person) => person.name === newName.trim()
        );
        axiosService.update(`${sameNamed[0].id}`, {
          ...sameNamed[0],
          number: newPhoneNumber.trim(),
        });
        setNewName("");
        setNewPhoneNumber("");
      }
    } else {
      axiosService.create(personObject).then((result) => {
      setPersons([...persons,result]);
      setMessage(`Added Successfuly ${result.name}`);
      setNewName("");
      setNewPhoneNumber("");

      setTimeout(() => {
        setMessage("");
      }, 5000);
      }).catch(error => {
        setPersons([...persons])
        setMessage(`${error.response.data.error}!!!`);
      setTimeout(() => {
        setMessage("");
      }, 5000);
        return;
      });
      return;
    }
  }

  function handlePersonAddition(event) {
    setNewName(event.target.value);
  }
  function handlePhoneAddition(event) {
    setNewPhoneNumber(event.target.value);
  }

  function handleFilter(event) {
    event.target.value === "" ? setShowAll(true) : setShowAll(false);

    setfilterName(event.target.value);

    let name = new RegExp(`^${event.target.value}`, "i");
    persons.map((person) => {
      if (name.test(person.name)) {
        person.important = true;
      } else {
        person.important = false;
      }
    });
  }

  async function Delete(person) {
    if (window.confirm(`Do you really want to delete ${person.name}`)) {
      await axiosService
        .Delete(person.id)
        .then(() => {
          setMessage(`Information of ${person.name} has  been removed.`);
        })
        .catch(() => {
          setMessage(`Information of ${person.name} has already been removed`);
        })
        .finally(() => {
          update();
        });
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  async function update() {
    const updatedDb = await axiosService.getAll();
    setPersons(updatedDb);
  }

  async function updateNumber(person) {
    if (person.name === newName) {
      axiosService.update(person.id, {
        ...person,
        number: newPhoneNumber.trim(),
      });

      update();
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filterName} handleFilter={handleFilter} />

      <h2>Add a New</h2>

      <Form
        addPerson={addPerson}
        handlePhoneAddition={handlePhoneAddition}
        handlePersonAddition={handlePersonAddition}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
      />

      <h2>Numbers</h2>

      <NameAndNumberDisplay
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        personsToShow={personsToShow}
        Delete={Delete}
      />
    </div>
  );
};

export default App;
