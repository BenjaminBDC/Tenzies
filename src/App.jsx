import React from 'react';
import './App.css';
import Die from './components/Die'

export default function App()
{
  const [dice, setDice] = React.useState(allNewDice())

  function allNewDice()
  {
    const newDice = [randomNumber= 0, isHeld= false]
    for (let i = 0; i < 10; i++)
    {
      newDice.push(Math.ceil(Math.random() * 6))
    }
    return newDice
  }

  const diceElements = dice.map(die => <Die value={die}  />)

  function roll()
  {
    setDice(allNewDice())
  }
  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="btn" onClick={roll}>
       <h1>Roll the dice!</h1>
      </button>
    </main>
  )
}
