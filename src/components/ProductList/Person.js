import React, { useState } from 'react';
import Parse from 'parse'
const l = console.log
export default function Person() {
  // State variables
  const [person, setPerson] = useState(null);

  async function addPerson() {
    try {
      // create a new Parse Object instance
      const Person = new Parse.Object('Person');
      // define the attributes you want for your Object
      Person.set('name', 'John');
      Person.set('email', 'john@back4app.com');
      // save it on Back4App Data Store
      const result = await Person.save();
      console.log('Person saved!');
      console.log(Person);
      console.log(result)
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  async function fetchPerson() {
    l(Parse)
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('Person');
    console.log(query)
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo('name', 'John');
    // run the query
    const person = await query.first();
    // access the Parse Object attributes
    console.log('person name: ', person.get('name'));
    console.log('person email: ', person.get('email'));
    console.log('person id: ', person.id);
    setPerson(person);
  }

  return (
    <div>
      <button onClick={addPerson}>Add Person</button>
      <button onClick={fetchPerson}>Fetch Person</button>
      {person !== null && (
        <div>
          <p>{`Name: ${person.get('name')}`}</p>
          <p>{`Email: ${person.get('email')}`}</p>
        </div>
      )}
    </div>
  );
};