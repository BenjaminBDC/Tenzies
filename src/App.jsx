import React from "react"
import {nanoid} from "nanoid"
import Die from './components/Die'



export default function App()
{
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
}, [dice])
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
    }

  function allNewDice()
  {
    const newDice = []
    for (let i = 0; i < 10; i++)
    {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  function rollDice()
  {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
        die : generateNewDie()
      }))
    }
    else{
      setTenzies(false)
      setDice(allNewDice())
    }
  }


  function holdDice(id)
  {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id?
      {
        ...die, 
        isHeld: !die.isHeld
      } :
      die
    }))
  }

  const diceElements = dice.map(die => (
   <Die 
   key={die.id}
   value={die.value} 
   isHeld={die.isHeld}
   holdDice={()=> holdDice(die.id)} />
  ))  

  return (
    <main>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="btn" 
      onClick={rollDice}>
       <h1>{tenzies? "new Game" : "Roll the dice!"}</h1>
      </button>
    </main>
  )
}
