import { expect } from 'chai'
import todos from '../../reducers/todos'

describe('Test all to do actions', () => {
  describe('Test add to do action', () => {
    it('should add one item to to_do list', () => {
      let stateBefore = []
      let action = {
        type: 'ADD_TODO',
        text: 'hello'
      }
      let stateAfter = [
        {
          id: 0,
          text: 'hello',
          completed: false
        }
      ]
      expect(todos(stateBefore, action)).to.eql(stateAfter)
    })
  })
  describe('Test toggle to do action', () => {
    it('should toggle one item in to_do list', () => {
      let stateBefore = [
        {
          id: 0,
          text: 'hello',
          completed: false
        },
        {
          id: 1,
          text: 'hey',
          completed: false
        }
      ]
      let action = {
        type: 'TOGGLE_TODO',
        id: 1
      }
      let stateAfter = [
        {
          id: 0,
          text: 'hello',
          completed: false
        },
        {
          id: 1,
          text: 'hey',
          completed: true
        }
      ]
      expect(todos(stateBefore, action)).to.eql(stateAfter)
    })
  })
})