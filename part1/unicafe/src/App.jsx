import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Display = ({ text, value}) => <div>{text} {value}</div>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text = 'give feedback'/>
      <Button onClick={handleGood} text = 'good' />
      <Button onClick={handleNeutral} text = 'neutral' />
      <Button onClick={handleBad} text = 'bad' />
      <Header text = 'statistics'/>
      <Display text = "good" value = {good}/>
      <Display text = "neutral" value = {neutral}/>
      <Display text = "bad" value = {bad}/>
    </div>
  )
}

export default App