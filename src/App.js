import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from './Firebase';
import firebase from 'firebase';

function App() {
  // set up short-term memory with react hooks
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here.. fires when the app.js loads
    // event listener
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // go through every doc, get the todo and set to dos
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id, 
        todo: doc.data().todo
      })))
    })
  }, []);

  // we have the array with the spread of todos (keep whatever we have in our short term memory) and append the input
  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // prevent default or form will refresh page

    // add to db, then fires off snapshot from event listener
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input])
    setInput('') // after submit clear input
  }

  return (
    <div className="App">
      <h1>Todo List!</h1>

      <form>
      <FormControl> {/* material ui for form, buttons, and list elements */}
        <InputLabel htmlFor="my-input">Write a Todo</InputLabel>
        <Input type="text" value={input} onChange={event => setInput(event.target.value)}/>
      </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>


      <div className="list"> {/* maps the todos from useState and appends the first string (todo) to the list */}
        {todos.map(todo => (
          <Todo todo={todo}/>
        ))}
      </div>

    </div>
  );
}

export default App;
