import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, decrementByAmount, reset } from './counterSlice'

const Counter = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="counter-container">
      <h2>Redux Counter Demo</h2>
      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>
      
      <div className="counter-buttons">
        <button 
          className="counter-btn increment-btn"
          onClick={() => dispatch(increment())}
        >
          +1
        </button>
        
        <button 
          className="counter-btn decrement-btn"
          onClick={() => dispatch(decrement())}
        >
          -1
        </button>
        
        <button 
          className="counter-btn increment-5-btn"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          +5
        </button>
        
        <button 
          className="counter-btn decrement-5-btn"
          onClick={() => dispatch(decrementByAmount(5))}
        >
          -5
        </button>
        
        <button 
          className="counter-btn reset-btn"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Counter

