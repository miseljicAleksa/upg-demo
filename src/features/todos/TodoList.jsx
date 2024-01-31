import {
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
} from "./todoApiSlice";
import { useState } from "react";
import styles from "./TodoList.module.css"; // Import the module stylesheet

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todoSubmitError, setTodoSubmitError] = useState(null);
  const [filter, setFilter] = useState("all");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodo.length < 3) {
      setTodoSubmitError("todo title must be at least 3 characters");
    } else {
      addTodo({ title: newTodo, completed: false });
      setNewTodo("");
      setTodoSubmitError(null);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "uncompleted") {
      return !todo.completed;
    }
    return true;
  });

  const newItemSection = (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className={styles.formBox}>
        <div className={styles.newTodo}>
          <input
            className={styles.input}
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
        </div>
        <button className={styles.submit}>+</button>
      </div>

      {todoSubmitError && <p className={styles.error}>{todoSubmitError}</p>}
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>loading...</p>;
  } else if (isSuccess) {
    content = filteredTodos.map((todo) => (
      <article
        className={`${todo.completed ? styles.articleCompleted : ""} ${
          styles.article
        }`}
        key={todo.id}
      >
        <div className={styles.todo}>
          <input
            className={styles.input}
            type="checkbox"
            checked={todo.completed}
            id={todo.id}
            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
          />
          <label
            onClick={() => updateTodo({ ...todo, completed: !todo.completed })}
            htmlFor={todo.id}
          >
            {todo.title}
          </label>
        </div>
        <button
          className={styles.trash}
          onClick={() => deleteTodo({ id: todo.id })}
        >
          delete
        </button>
      </article>
    ));
  } else if (isError) {
    content = <p>{error.error}</p>;
  }

  return (
    <main className={styles.main}>
      <h1>Todo List</h1>
      {newItemSection}
      <div className={styles.filters}>
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("completed")}>
          Completed
        </button>
        <button onClick={() => handleFilterChange("uncompleted")}>
          Uncompleted
        </button>
      </div>
      {content}
    </main>
  );
};

export default TodoList;
