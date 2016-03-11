import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
// import { createStore } from 'redux'

ReactDom.render(
  <div>
    <form onsubmit={ (event) => {
      event.preventDefault()

    }} >
      <input type="text"/>
      <button>Add todo</button>
    </form>
  </div>,
  document.getElementById('root')
)
