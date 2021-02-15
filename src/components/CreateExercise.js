import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const CreateExercise = () => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/')
      .then((response) => {
        if (response.data.length > 0) {
          setState((prevState) => {
            return {
              ...prevState,
              users: response.data.map((user) => user.username),
              username: response.data[0].username,
            };
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  function handleTextInputsChanges(event) {
    const {
      target: { name, value },
    } = event;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function onChangeDate(date) {
    setState((prevState) => {
      return {
        ...prevState,
        date: date,
      };
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };

    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    window.location = '/';
  }

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            name="username"
            required
            className="form-control"
            value={state.username}
            onChange={handleTextInputsChanges}
          >
            {state.users.map((user, index) => {
              return (
                <option key={index} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            name="description"
            required
            className="form-control"
            value={state.description}
            onChange={handleTextInputsChanges}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            name="duration"
            className="form-control"
            value={state.duration}
            onChange={handleTextInputsChanges}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={state.date} onChange={onChangeDate} />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
