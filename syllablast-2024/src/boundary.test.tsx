import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Model } from './model'
import { config1 } from './puzzle'
import { swapController } from './controllers'

import Home from './app/page'

// to write this kind of test, we need to be able to render canvas, so we need 
// to simply run (once) npm install canvas. Tricky for GUI but these have to 
// be async functions that are cleaned up afterwards. Only for REACT gui
test('Home', async () => {
    const { getByText } = render(<Home />)
    const scoreElement = getByText(/Score: 0/i);
    const movesElement = getByText(/No of Moves: 0/i);
    expect(scoreElement === undefined).toBe(false)
    expect(movesElement === undefined).toBe(false)
    cleanup()
})

describe('Home component', () => {
    let model: Model

    beforeEach(() => {
        model = new Model(config1)
    })

    afterEach(() => {
        cleanup()
    })

    test('handleSelect should select the element correctly', () => {
        const { container } = render(<Home />)
        const element = container.querySelector(`[id='${0}']`) as HTMLElement
        fireEvent.click(element)
        expect(element.style.backgroundColor).toBe('yellow')
    })

    test('handleSwap should swap elements correctly', async () => {
        const { container, getByText } = render(<Home />)
        const swapButton = container.querySelector('#swap') as HTMLButtonElement
        const movesElement = getByText(/No of Moves: 0/i);
        const element = container.querySelector(`[id='${4}']`) as HTMLElement
        fireEvent.click(element)
        expect(element.style.backgroundColor).toBe('yellow')

        const element2 = container.querySelector(`[id='${6}']`) as HTMLElement
        fireEvent.click(element2)
        expect(element2.style.backgroundColor).toBe('yellow')

        fireEvent.click(swapButton)
        expect(movesElement.textContent).toBe('No of Moves: 1')

    })

    test('handleUndo should undo the last move', () => {
        const { container, getByText } = render(<Home />)
        const undoButton = container.querySelector('#undo') as HTMLButtonElement
        const swapButton = container.querySelector('#swap') as HTMLButtonElement

        const movesElement = getByText(/No of Moves: 0/i);
        const element = container.querySelector(`[id='${0}']`) as HTMLElement
        fireEvent.click(element)
        expect(element.style.backgroundColor).toBe('yellow')

        const element2 = container.querySelector(`[id='${1}']`) as HTMLElement
        fireEvent.click(element2)
        expect(element2.style.backgroundColor).toBe('yellow')

        fireEvent.click(swapButton)
        expect(movesElement.textContent).toBe('No of Moves: 1')
        fireEvent.click(undoButton)
        expect(movesElement.textContent).toBe('No of Moves: 0')
    })

    test('handleReset should reset the game', () => {
        const { container } = render(<Home />)
        const resetButton = container.querySelector('#reset') as HTMLButtonElement
        fireEvent.click(resetButton)
        for (let i = 0; i < 16; i++) {
            const element = container.querySelector(`[id='${i}']`) as HTMLElement
            expect(element.style.backgroundColor).toBe('white')
        }
    })

    test('handleConfigChange should change the configuration correctly', () => {
        const { container, getByText } = render(<Home />)
        const selectElement = container.querySelector('select') as HTMLSelectElement
        const resetButton = container.querySelector('#reset') as HTMLButtonElement

        fireEvent.change(selectElement, { target: { value: 'config2' } })
        fireEvent.click(resetButton)
        // Assuming handleReset resets the game based on the selected config
        for (let i = 0; i < 16; i++) {
            const element = container.querySelector(`[id='${i}']`) as HTMLElement
            // Check if the elements are reset according to config2
            expect(element.style.backgroundColor).toBe('white')
        }

        fireEvent.change(selectElement, { target: { value: 'config3' } })
        fireEvent.click(resetButton)
        // Assuming handleReset resets the game based on the selected config
        for (let i = 0; i < 16; i++) {
            const element = container.querySelector(`[id='${i}']`) as HTMLElement
            // Check if the elements are reset according to config3
            expect(element.style.backgroundColor).toBe('white')
        }
    })
})