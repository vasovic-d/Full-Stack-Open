import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const StatisticLine = ({ text, value, percent }) => <tr><td>{text}</td><td>{value}</td><td>{percent}</td></tr>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const avg = (good - bad) / sum
  const positive = good / sum * 100
  if (sum === 0){
    return(
      <div>No feedback given</div>
    )
  }
  return (
  <div>
    <table>
      <tbody>
        <StatisticLine text = "good" value = {good}/>
        <StatisticLine text = "neutral" value = {neutral}/>
        <StatisticLine text = "bad" value = {bad}/>
        <StatisticLine text = "all" value = {sum}/>
        <StatisticLine text = "average" value = {avg}/>
        <StatisticLine text = "positive" value = {positive} percent = "%"/>
      </tbody>
    </table>
  </div>
  )
}

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
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App