import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';

function App() {

  const [operand, setOperand] = useState("")
  const [current, setCurrent] = useState("0")
  const [old, setOld] = useState("0")
  const [willBeCleared, setWillBeCleared] = useState(false)


  const addDigit = (e) => {

    if (willBeCleared && current !== '0') {
      setCurrent(e.target.innerHTML)
      setWillBeCleared(false)
    } else {
      current !== '0' ? setCurrent(current + e.target.innerHTML) : setCurrent(e.target.innerHTML)
      setOperand('')
    }
  }

  const clearAll = () => {
    setCurrent('0')
    setOld('0')
    setOperand('')
    setWillBeCleared(false)
  }

  const calc = (op, op1, op2) => {
    console.log(`Calculating ${op1} ${op} ${op2}`);
    switch (op) {
      case '+': return parseFloat((op1 + op2).toFixed(4));
      case '-': return parseFloat((op1 + op2).toFixed(4));
      case 'x': return parseFloat((op1 * op2).toFixed(4));
      case '/': return parseFloat((op1 / op2).toFixed(4));
      default: break;
    }
  }
  const addOperand = (e) => {
    if (operand === '' && current !== '0' && old !== '0') {
      console.log(old);
      if (old.charAt(old.length - 1) === '-' && isNaN(old.charAt(old.length - 2)))
        setOld(calc(old.charAt(old.length - 2), parseFloat(old), parseFloat(-current)) + e.target.innerHTML)
      else if (old.charAt(old.length - 1) === '-')
        setOld(calc(old.charAt(old.length - 1), parseFloat(old), parseFloat(-current)) + e.target.innerHTML)
      else
        setOld(calc(old.charAt(old.length - 1), parseFloat(old), parseFloat(current)) + e.target.innerHTML)

      setCurrent('0')
      setOperand(e.target.innerHTML);
    }

    else if (operand === '' && current !== '0' && old === '0') {
      setOld(current + e.target.innerHTML)
      setCurrent('0')
      setOperand(e.target.innerHTML);
    }

    else if (operand !== '' && current === '0') {
      console.log(e.target.innerHTML);
      if (e.target.innerHTML === "-" && isNaN(old.charAt(old.length - 1)) && !isNaN(old.charAt(old.length - 2))) {
        setOld(old + e.target.innerHTML)
      } else
        setOld(old.slice(0, old.length - 1) + e.target.innerHTML);
      setOperand(e.target.innerHTML);
    }
  }

  const addDecimal = () => {
    if (!current.includes(".")) setCurrent(current + ".")
  }

  const evaluate = () => {
    if (operand === '' && current !== '0' && old !== '0') {
      console.log(old);
      setOld('0')

      if (old.charAt(old.length - 1) === '-' && isNaN(old.charAt(old.length - 2)))
        setCurrent(calc(old.charAt(old.length - 2), parseFloat(old), parseFloat(-current)))
      else if (old.charAt(old.length - 1) === '-')
        setCurrent(calc(old.charAt(old.length - 1), parseFloat(old), parseFloat(-current)))
      else
        setCurrent(calc(old.charAt(old.length - 1), parseFloat(old), parseFloat(current)))

      setOperand('')
      setWillBeCleared(true)
    }
  }

  return (
    <div className="container-fluid">
      <div className='d-flex justify-content-center text-center mx-0 px-0'>
        <div className='row d-flex col-3 border mx-0 px-0'>
          <div className='row d-flex text-end mx-0 px-0 '>
            <div>{old}</div>
            <div id="display">{current}</div>
          </div>
          <div className='row d-flex mx-0 px-0'>
            <div id='clear' className='col-6 btn rounded-0 btn-dark' onClick={clearAll}>AC</div>
            <div id="divide" className='col-3 btn rounded-0 btn-secondary' onClick={addOperand}>/</div>
            <div id="multiply" className='col-3 btn rounded-0 btn-secondary' onClick={addOperand}>x</div>
          </div>
          <div className='row d-flex mx-0 px-0'>
            <div id="seven" className='col-3 btn rounded-0 btn-danger' onClick={addDigit}>7</div>
            <div id="eight" className='col-3 btn rounded-0 btn-danger' onClick={addDigit}>8</div>
            <div id="nine" className='col-3 btn rounded-0 btn-danger' onClick={addDigit}>9</div>
            <div id="subtract" className='col-3 btn rounded-0 btn-secondary' onClick={addOperand}>-</div>
          </div>
          <div className='row d-flex mx-0 px-0'>
            <div id="four" className='col-3 btn rounded-0 btn-danger' onClick={addDigit}>4</div>
            <div id="five" className='col-3 btn rounded-0 btn-danger' onClick={addDigit}>5</div>
            <div id="six" className='col-3 btn rounded-0 btn-danger' onClick={addDigit}>6</div>
            <div id="add" className='col-3 btn rounded-0 btn-secondary' onClick={addOperand}>+</div>
          </div>
          <div className='row d-flex mx-0 px-0'>
            <div className='row d-flex mx-0 px-0 col-9'>
              <div className='row d-flex mx-0 px-0'>
                <div id="one" className='col-4 btn rounded-0 btn-danger' onClick={addDigit}>1</div>
                <div id="two" className='col-4 btn rounded-0 btn-danger' onClick={addDigit}>2</div>
                <div id="three" className='col-4 btn rounded-0 btn-danger' onClick={addDigit}>3</div>
              </div>
              <div className='row d-flex mx-0 px-0'>
                <div id="zero" className='col-8 btn rounded-0 btn-danger' onClick={addDigit}>0</div>
                <div id="decimal" className='col-4 btn rounded-0 btn-danger' onClick={addDecimal}>.</div>
              </div>
            </div>
            <div className='row d-flex mx-0 px-0 col-3'>
              <div id="equals" className='mx-0 px-0 btn rounded-0 btn-primary' onClick={evaluate}>=</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
