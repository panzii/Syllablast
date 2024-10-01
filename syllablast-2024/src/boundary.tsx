'use client'
import React from 'react'

import { Model } from './model'
import { selectController } from './controllers'

interface BoardGUIProps {
    topmodel: Model;
    redraw: () => void;
}

export function BoardGUI({ topmodel, redraw }: BoardGUIProps) {

    function handleClick(index: number) {
        selectController(index, topmodel)
    }

    return (
        <div style={{ border: '1px solid black', display: 'inline-block' }}>
            <div>
                <button id='0' className="square" onClick={() => handleClick(0)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[0].content}</button>
                <button id='1' className="square" onClick={() => handleClick(1)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[1].content}</button>
                <button id='2' className="square" onClick={() => handleClick(2)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[2].content}</button>
                <button id='3' className="square" onClick={() => handleClick(3)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[3].content}</button>
            </div>
            <div>
                <button id='4' className="square" onClick={() => handleClick(4)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[4].content}</button>
                <button id='5' className="square" onClick={() => handleClick(5)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[5].content}</button>
                <button id='6' className="square" onClick={() => handleClick(6)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[6].content}</button>
                <button id='7' className="square" onClick={() => handleClick(7)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[7].content}</button>
            </div>
            <div>
                <button id='8' className="square" onClick={() => handleClick(8)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[8].content}</button>
                <button id='9' className="square" onClick={() => handleClick(9)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[9].content}</button>
                <button id='10' className="square" onClick={() => handleClick(10)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[10].content}</button>
                <button id='11' className="square" onClick={() => handleClick(11)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[11].content}</button>
            </div>
            <div>
                <button id='12' className="square" onClick={() => handleClick(12)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[12].content}</button>
                <button id='13' className="square" onClick={() => handleClick(13)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[13].content}</button>
                <button id='14' className="square" onClick={() => handleClick(14)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[14].content}</button>
                <button id='15' className="square" onClick={() => handleClick(15)} style={{ backgroundColor: 'white' }}> {topmodel.puzzle.syllables[15].content}</button>
            </div>
        </div>
    )
}
