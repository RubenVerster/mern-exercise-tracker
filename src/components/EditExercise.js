import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditExercise = (props) => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/exercises/' + props.match.params.id)
      .then((response) => {
        console.log(response.data);
        setState((prevState) => {
          return {
            ...prevState,
            username: response.data.username,
            description: response.data.description,
            duration: response.data.duration,
            date: new Date(response.data.date),
          };
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('http://localhost:5000/users/')
      .then((response) => {
        if (response.data.length > 0) {
          setState((prevState) => {
            return {
              ...prevState,
              users: response.data.map((user) => user.username),
            };
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputTextChanges = (event) => {
    const {
      target: { name, value },
    } = event;

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onChangeDate = (date) => {
    setState((prevState) => {
      return {
        ...prevState,
        date: date,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };

    axios
      .post(
        'http://localhost:5000/exercises/update/' + props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));

    window.location = '/';
  };

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            name="username"
            required
            className="form-control"
            value={state.username}
            onChange={handleInputTextChanges}
          >
            {state.users.map(function (user) {
              return (
                <option key={user} value={user}>
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
            onChange={handleInputTextChanges}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            name="duration"
            className="form-control"
            value={state.duration}
            onChange={handleInputTextChanges}
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
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
