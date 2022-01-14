import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { restoreTodo, clearTodos, todoSelectors, todoAdapter } from '../../store/todoSlice';
import Todo from './Todo/Todo.js';

const TodoList = () => {
  const dispatch = useDispatch();
  const data = todoAdapter.getSelectors((state) => state);
  // console.log(todoSelectors)
  const allTodos = useSelector(data.selectEntities);
  const todoCount = useSelector(data.selectTotal);
  const deletedTodos = useSelector((state) => state.deletedTodos);

  const todoList = [];
  for (const id in allTodos) {
    if (Object.hasOwnProperty.call(allTodos, id)) {
      const todoItem = allTodos[id];
      todoList.push(
        <Todo
          key={todoItem.id}
          id={todoItem.id}
          text={todoItem.todo}
          deadline={todoItem.deadline}
          completed={todoItem.completed}
        />
      );
    }
  }

  const restore = (todo) => {
    dispatch(restoreTodo(todo));
  };

  const deletedList = deletedTodos.map((todo) => (
    <div className="deleted-todo" key={todo.id}>
      <span>{todo.todo}</span>
      <button onClick={() => restore(todo)}>Restore</button>
    </div>
  ));

  const clearList = () => {
    dispatch(clearTodos());
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  console.log(todoList);
  return (
    <div className="todo-list">
      <h3>
        I have {todoCount} todos for {date}
      </h3>
      <div>{todoList}</div>
      <button className="delete-btn" onClick={clearList}>
        Clear All Todos
      </button>
      <h3>Deleted:</h3>
      <div>{deletedList}</div>
      <h3>Note:</h3>
      <input style={{ height: '100px', width: '100%', padding: '0px' }} />
    </div>
  );
};

export default TodoList;
