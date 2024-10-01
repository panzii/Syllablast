'use client'
import React from 'react'

import { config1, config2, config3 } from '../puzzle'
import { Model } from '../model'
import { BoardGUI } from '../boundary'
import { swapController, undoController } from '../controllers'

let actualPuzzle = config1

export default function Home() {
  const [model, setModel] = React.useState(new Model(actualPuzzle));
  const [redraw, setRedraw] = React.useState(0)

  function refresh() {
    setRedraw(redraw + 1)
  }

  function setCorrectResetConfig() {
    let syllable
    for (let i = 0; i < model.puzzle.syllables.length; i++) {
      syllable = document.getElementById(i.toString())
      if (syllable) {
        syllable.style.backgroundColor = 'white'
      }
    }
    document.getElementById('won')!.style.display = 'none';
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      (button as HTMLButtonElement).disabled = false;
    });
  }

  function setCorrectSyllableColor() {
    let correctSyllable
    for (let i = 0; i < model.puzzle.syllables.length; i++) {
      correctSyllable = document.getElementById(i.toString())
      if (model.puzzle.syllables[i].isInCorrectLocation) {
        if (correctSyllable) {
          correctSyllable.style.backgroundColor = 'lightgreen'
        }
      }
      else {
        if (correctSyllable) {
          correctSyllable.style.backgroundColor = 'white'
        }
      }
    }
  }

  function handleSwap() {
    const swappedIndices = swapController(model)

    if (swappedIndices) {
      const indexA = swappedIndices[0]
      const indexB = swappedIndices[1]

      const selectedA = document.getElementById(indexA.toString())
      const selectedB = document.getElementById(indexB.toString())

      if (selectedA) {
        selectedA.style.backgroundColor = 'white';
      }
      if (selectedB) {
        selectedB.style.backgroundColor = 'white';
      }
    }
    else {
      return
    }

    // Check if the score is 16, indicating the game is won
    if (model.score === 16) {
      document.getElementById('won')!.style.display = 'block';

      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        (button as HTMLButtonElement).disabled = true;
      });
      (document.getElementById('reset') as HTMLButtonElement)!.disabled = false;
    }
    setCorrectSyllableColor()
    refresh();
  }

  function handleUndo() {
    if (undoController(model)) {
      setCorrectSyllableColor()
      refresh();
    }
    else {
      return
    }
  }

  function handleReset() {
    setModel(new Model(actualPuzzle));
    setCorrectResetConfig()
    refresh();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '40px', marginRight: '40px' }}>
        <h3>Syllablast</h3>
        <select onChange={(e) => {
          const selectedConfig = e.target.value;
          if (selectedConfig === 'config1') {
            actualPuzzle = config1;
          } else if (selectedConfig === 'config2') {
            actualPuzzle = config2;
          } else if (selectedConfig === 'config3') {
            actualPuzzle = config3;
          }
          handleReset();
        }}>
          <option value="config1">Config 1</option>
          <option value="config2">Config 2</option>
          <option value="config3">Config 3</option>
        </select>
      </div>

      <hr style={{ margin: '0px 20px' }} />

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '40px', marginRight: '40px' }}>
        <div className="stats">
          <label>Score: {model.score}</label>
        </div>
        <div className="stats">
          <label>No of Moves: {model.numMoves}</label>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div>
          <h2>{actualPuzzle === config1 ? 'Configuration #1' : actualPuzzle === config2 ? 'Configuration #2' : 'Configuration #3'}</h2>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <BoardGUI topmodel={model} redraw={refresh}></BoardGUI>
      </div>
      <div className="button-container">
        <button id="undo" className="custom-button" onClick={() => handleUndo()} disabled={model.mostRecentMoves.length === 0}>Undo</button>
        <button id="swap" className="custom-button" onClick={() => handleSwap()}>Swap</button>
        <button id="reset" className="custom-button" onClick={() => handleReset()}>Reset</button>
      </div>

      <label id='won' style={{ color: 'green', fontSize: '20px', display: 'none' }}>Congratulations! You won the game!</label>
    </div >
  )
}