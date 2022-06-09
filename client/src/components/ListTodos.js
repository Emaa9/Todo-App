import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTodo, getTodos } from "../features/todosSlice";
import moment from "moment";
import "../App.css";
import { CircularProgress, Card } from "@mui/material";

const ListTodos = ({ setTodo }) => {
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todosState);
  const { todos } = todosState;

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h2 className="count"> You have {todos && todos.length} tasks </h2>
      <div className="list">
      {todosState.getTodosStatus === "pending" ? <CircularProgress /> : null}
      {todos.map((todo) => (
        <Card
         className="card"
          key={todo._id}
        >
          <h3 className="todo">{todo.task}</h3>
          <p className="add">Added: {moment(todo.date).fromNow()}</p>
         <div className="button">
          <button
            className="button1"
            onClick={() => setTodo({ ...todo })}
          >
            Update
          </button>
          <button
            className="button1"
            onClick={() => handleDelete(todo._id)}
          >
            Delete
          </button>
          </div>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default ListTodos;
