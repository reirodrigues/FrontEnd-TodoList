import logo from './logo.svg'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

const arrayTodos = [
  { name: 'Limpar casa', status: false },
  { name: 'Lavar cachorro', status: false }
]

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map(todo => {
          return (
            <div className="todo">
              <button
                onClick={() => modifyStatusTodo(todo)}
                className="checkbox"
                style={{ backgroundColor: todo.status ? '#A879E6' : 'white' }}
              ></button>
              <p>{todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={'#64697b'}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={'#64697b'}></AiOutlineDelete>
              </button>
            </div>
          )
        })}
      </div>
    )
  }

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility)
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo)
    setInputVisibility(true)
  }

  async function editTodo() {
    const response = await axios.put('http://localhost:3333/todos', {
      id: selectedTodo.id,
      name: inputValue
    })
    setSelectedTodo()
    setInputVisibility(false)
    getTodos()
    setInputValue('')
  }

  async function getTodos() {
    const response = await axios.get('http://localhost:3333/todos')
    setTodos(response.data)
  }

  async function createTodo() {
    const response = await axios.post('http://localhost:3333/todos', {
      name: inputValue
    })
    getTodos()
    setInputVisibility(!inputVisibility)
    setInputValue('')
  }

  async function deleteTodo(todo) {
    const response = await axios.delete(
      `http://localhost:3333/todos/${todo.id}`
    )
    getTodos()
  }

  async function modifyStatusTodo(todo) {
    const response = axios.put('http://localhost:3333/todos', {
      id: todo.id,
      status: !todo.status
    })
    getTodos()
  }

  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputVisibility, setInputVisibility] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState()

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Dont be lazzy</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input
          value={inputValue}
          style={{ display: inputVisibility ? 'block' : 'none' }}
          onChange={e => {
            setInputValue(e.target.value)
          }}
          className="inputName"
        ></input>
        <button
          onClick={
            inputVisibility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisibility ? 'Confirm' : '+ New task'}
        </button>
      </header>
    </div>
  )
}

export default App
