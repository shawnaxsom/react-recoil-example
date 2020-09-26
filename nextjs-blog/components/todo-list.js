import React, { useRef } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

// Example from: https://recoiljs.org/docs/introduction/getting-started

const newTodoState = atom({
  key: 'newTodoState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

const todoListState = atom({
  key: 'todoListState', // unique ID (with respect to other atoms/selectors)
  default: [{
    label: 'Foo',
  }, {
    label: 'Bar',
  }], // default value (aka initial value)
});

// const charCountState = selector({
//   key: 'charCountState', // unique ID (with respect to other atoms/selectors)
//   get: ({get}) => {
//     const text = get(newTodoState);

//     return text.length;
//   },
// });

// function CharacterCount() {
//   const count = useRecoilValue(charCountState);

//   return <>Character Count: {count}</>;
// }

function Todos() {
  const [todos, setTodos] = useRecoilState(todoListState);

  return <ul>
    {todos.map(todo => (
      <li key={todo.label} className="todo">
        <div className="label">{todo.label}</div>
        <button className="deleteButton" onClick={() => {
          setTodos(todos.filter(t => t.label !== todo.label));
          document.querySelector('.deleteButton').focus();
        }}>x</button>
      </li>
    ))}

    <style jsx>{`
      .todo {
        display: flex;
      }

      .label {
        margin-right: 20px;
      }

      .deleteButton {
        cursor: pointer;
      }
    `}</style>
  </ul>;
}
function TextInput() {
  const [text, setText] = useRecoilState(newTodoState);
  const [todos, setTodos] = useRecoilState(todoListState);
  const refInput = useRef(null);

  const createTodo = () => {
    setTodos([...todos, { label: text }]);
    setText('');
    refInput.current.focus();
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter'){
      createTodo();
    }
  };

  return (
    <div className="todoListContainer">
      <div className="inputControls">
        <input
          id="todoInput"
          type="text"
          value={text}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={refInput}
        />
        <button className="createButton" onClick={createTodo}>create</button>
      </div>
      <br />
      Echo: {text}

      <style jsx>{`
        .inputControls {
          display: flex;
        }

        input {
          margin-right: 20px;
        }

        .createButton {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export function TodoList() {
  return (
    <div>
      <TextInput />

      <Todos />
    </div>
  );
}
