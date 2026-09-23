import { useState } from 'react'
import './App.css'

const languages = [
  { name: 'Html', backgroundColor: '#e34c26', color: '#ffffff' },
  { name: 'Css', backgroundColor: '#264de4', color: '#ffffff' },
  { name: 'JavaScript', backgroundColor: '#f0db4f', color: '#000000' },
  { name: 'React', backgroundColor: '#61dafb', color: '#000000' },
  { name: 'Node.js', backgroundColor: '#339933', color: '#ffffff' },
  { name: 'MongoDB', backgroundColor: '#47a248', color: '#ffffff' },
  { name: 'Ruby', backgroundColor: '#D02B2B', color: '#ffffff' },
  { name: 'Python', backgroundColor: '#3776ab', color: '#ffffff' },
  { name: 'Assembly', backgroundColor: '#2D519F', color: '#ffffff' },
]

const word = ['REACTOR','ELEPHANT','PYTHON','JAVASCRIPT','HTML','CSS','REACT','NODE.JS','MONGODB','RUBY','PYTHON','ASSEMBLY']
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function App() {
  const [guessedLetters, setGuessedLetters] = useState([])
  const [showWrongPopup, setShowWrongPopup] = useState(false)

  const wrongGuesses = guessedLetters.filter(
    (letter) => !word.includes(letter)
  )
  const wrongCount = wrongGuesses.length
  const isLost = wrongCount >= languages.length - 1
  const isWon = word
    .split('')
    .every((letter) => guessedLetters.includes(letter))
  const gameOver = isWon || isLost

  function addGuessedLetter(letter) {
    if (gameOver || guessedLetters.includes(letter)) return

    setGuessedLetters((prev) => [...prev, letter])

    if (!word.includes(letter)) {
      setShowWrongPopup(true)
      setTimeout(() => setShowWrongPopup(false), 1500)
    }
  }

  function resetGame() {
    setGuessedLetters([])
    setShowWrongPopup(false)
  }

  return (
    <div className="app-container">
      <h1>Assembly: EndGame</h1>
      <p>
        Guess the word in under 8 attempts to keep the programming world safe
        from Assembly!
      </p>

      {showWrongPopup && (
        <div className="popup wrong">Wrong! Try again.</div>
      )}
      {isWon && <div className="popup win">You win! Well done!</div>}
      {isLost && (
        <div className="popup lose">Game Over! You Lose! Better start learning assembly.</div>
      )}

      <div className="languages">
        {languages.map((lang, index) => {
          const isDead = index < wrongCount
          return (
            <span
              key={lang.name}
              className={`lang-chip ${isDead ? 'dead' : ''}`}
              style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
              }}
            >
              {lang.name}
            </span>
          )
        })}
      </div>

      <div className="word">
        {word.split('').map((letter, index) => (
          <span key={index} className="letter">
            {guessedLetters.includes(letter) ? letter : ''}
          </span>
        ))}
      </div> 
      <div className="keyboard">
        {alphabet.map((letter) => {
          const guessed = guessedLetters.includes(letter)
          const correct = guessed && word.includes(letter)
          const wrong = guessed && !word.includes(letter)
          return (
            <button
              key={letter}
              className={`key ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}
              onClick={() => addGuessedLetter(letter)}
              disabled={guessed || gameOver}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {gameOver && (
        <button className="new-game" onClick={resetGame}>
          New Game
        </button>
      )}
    </div>
  )
}

export default App
