import { expect, test } from 'vitest'
import { config1, config2, config3 } from './puzzle'
import { Model, Puzzle, Coordinate, Syllable } from './model'
import { calcIndex, selectController, swapController, undoController } from './controllers'


test('Coordinate', () => {
    let c1 = new Coordinate(2, 3)
    expect(c1.row).toBe(2)
    expect(c1.col).toBe(3)
})

test('Syllable', () => {
    let s1 = new Syllable("hello", false, 0, 0)
    expect(s1.content).toBe("hello")
    expect(s1.location.row).toBe(0)
    expect(s1.location.col).toBe(0)
    expect(s1.isInCorrectLocation).toBe(false)
    expect(s1.isStart).toBe(false)
})


test('Model', () => {
    let model = new Model(config1)
    expect(model.numMoves).toBe(0)
    expect(model.score).toBe(0)
    expect(model.mostRecentMoves).toEqual([])
    expect(model.currentConfig).toBe("#1")
})

test('getLeftSyllables', () => {
    let model = new Model(config1)
    let syllableContent = "i"
    expect(model.puzzle.getLeftSyllables(syllableContent)).toEqual([["vis", "in"], ["fil", "af"]])
})

test('checkCorrectLocation', () => {
    let model = new Model(config1)
    model.puzzle.selected = [model.puzzle.syllables[4], model.puzzle.syllables[6]]
    swapController(model)
    expect(model.puzzle.selected).toEqual([])
    expect(model.puzzle.checkCorrectLocation(4)).toEqual(true)


    model.puzzle.selected = [model.puzzle.syllables[10], model.puzzle.syllables[5]]
    swapController(model)
    expect(model.puzzle.selected).toEqual([])
    expect(model.puzzle.checkCorrectLocation(5)).toEqual(true)

    model.puzzle.selected = [model.puzzle.syllables[4], model.puzzle.syllables[0]]
    swapController(model)
    expect(model.puzzle.selected).toEqual([])
    expect(model.puzzle.checkCorrectLocation(4)).toEqual(false)
    expect(model.puzzle.checkCorrectLocation(5)).toEqual(false)

})

test('computeScore', () => {
    let model = new Model(config1)
    model.puzzle.syllables[0].isInCorrectLocation = true
    model.puzzle.syllables[1].isInCorrectLocation = true
    model.computeScore()
    expect(model.score).toBe(2)

    model.puzzle.syllables[2].isInCorrectLocation = true
    model.computeScore()
    expect(model.score).toBe(3)

    model.puzzle.syllables[0].isInCorrectLocation = false
    model.computeScore()
    expect(model.score).toBe(2)
})

// controllers
test('calcIndex', () => {
    let model = new Model(config1)
    let syllable = model.puzzle.syllables[5]
    expect(calcIndex(syllable)).toBe(5)
})

test('selectController', () => {
    let model = new Model(config1)
    let syllable = model.puzzle.syllables[5]
    let syllable2 = model.puzzle.syllables[6]
    let syllable3 = model.puzzle.syllables[7]

    selectController(5, model)
    expect(model.puzzle.selected).toEqual([syllable])

    selectController(5, model)
    expect(model.puzzle.selected).toEqual([])

    selectController(5, model)
    selectController(6, model)
    selectController(7, model)
    expect(model.puzzle.selected).toEqual([syllable, syllable2])

    selectController(6, model)
})

test('UndoController', () => {
    let model = new Model(config1)
    model.puzzle.selected = [model.puzzle.syllables[5], model.puzzle.syllables[6]]
    swapController(model)
    expect(model.mostRecentMoves.length).toBe(1)
    expect(model.numMoves).toBe(1)

    undoController(model)
    expect(model.mostRecentMoves.length).toBe(0)

    let before = model
    undoController(model)
    expect(model).toEqual(before)
})




