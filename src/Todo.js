import React, {Component} from 'react'
import todos from './data.js'

class Todo extends Component {
  state = {
    todos: todos,
    createTodoText: '',
    updateTodoText: '',
    isUpdateTodo: false,
    updateTodo: {}
  }
  _createTodo = () => {
    let todo = {
      text: this.state.createTodoText,
      completion: false,
      id: Date.now()
    }
    let todos = [...this.state.todos, todo]
    this.setState({
      createTodoText: '',
      todos
    })
  }
  _createTodoText = (event) => {
    if (event.keyCode === 13) {
      return this._createTodo();
    }
    this.setState({
      createTodoText: event.target.value
    });
  }
  _onKeyDown = (e, fn) => {
    if (e.keyCode === 13) {
      fn();
    }
  }
  _createTodoHtml = () => {
        return <div className='card mt-2'>
          <div className='card-header'>
            <h2>Create a todo</h2>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-sm-6'>
                <input
                  type='text'
                  value={this.state.createTodoText}
                  onChange={this._createTodoText}
                  onKeyDown={(e) => this._onKeyDown(e, this._createTodo)}
                  className='form-control'
                  />
                  <input
                    type='submit'
                    className='btn btn-info mt-2'
                    value='add a new todo'
                    onClick={this._createTodo}
                  />
              </div>
            </div>
          </div>
        </div>
  }
  _toggleTodo = (id) => {
    let todos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {
          id: todo.id,
          text: todo.text,
          completion: ! todo.completion
        }
      } else {
        return todo
      }
    });
    this.setState({todos})
  }
  _displayTodoText = (todo) => {
    if (todo.completion === true) {
      return <span onClick={() => this._toggleTodo(todo.id)} className='lh'>{todo.text}</span>
    }else {
      return <span onClick={() => this._toggleTodo(todo.id)}>{todo.text}</span>
    }
  }
  render () {
    console.log('all states', this.state)
    return (
      <div>
        <div className='card'>
          <div className='card-header'>
            <h2>All todos</h2>
          </div>
          <div className='card-body'>
            <ul className='list-group'>
              {
                this.state.todos.map((todo, i) => {
                  return <li
                          key={todo.id}
                          className='list-group-item'>
                            {this._displayTodoText(todo)}
                            <button
                             className='btn btn-success m-2'>Edit</button>
                            <button className='btn btn-danger m-2'>delete</button>
                          </li>
                })
              }
            </ul>
          </div>
        </div>
        {this._createTodoHtml()}
      </div>
    )
  }
}

export default Todo
