import { Model, Syllable } from './model'

export function calcIndex(syllable: Syllable): number {
    return syllable.location.row * 4 + syllable.location.col
}

export function selectController(index: number, topmodel: Model) {
    // Handle unselect
    if (topmodel.puzzle.selected.length > 0) {
        if (index === calcIndex(topmodel.puzzle.selected[0])) {
            const element = document.getElementById(index.toString());
            if (element) {
                if (topmodel.puzzle.selected[0].isInCorrectLocation) {
                    element.style.backgroundColor = 'lightgreen';
                }
                else {
                    element.style.backgroundColor = 'white';
                }
            }
            topmodel.puzzle.selected.splice(topmodel.puzzle.selected.indexOf(topmodel.puzzle.syllables[index]), 1);
            return;
        } else if (topmodel.puzzle.selected.length > 1 && index === calcIndex(topmodel.puzzle.selected[1])) {
            const element = document.getElementById(index.toString());
            if (element) {
                if (topmodel.puzzle.selected[1].isInCorrectLocation) {
                    element.style.backgroundColor = 'lightgreen';
                }
                else {
                    element.style.backgroundColor = 'white';
                }
            }
            topmodel.puzzle.selected.splice(topmodel.puzzle.selected.indexOf(topmodel.puzzle.syllables[index]), 1);
            return;
        }
    }


    console.log("You clicked on square " + index)
    if (topmodel.puzzle.selected.length === 2) {
        console.log("You have already selected two syllables")


    } else {
        const element = document.getElementById(index.toString());
        if (element) {
            element.style.backgroundColor = 'yellow';
        }
        topmodel.puzzle.selected.push(topmodel.puzzle.syllables[index])
    }
}



export function swapController(model: Model): [number, number] | void {
    if (model.puzzle.selected.length < 2) {
        console.log("Not enough syllables selected")
        return
    }

    const syllableA = model.puzzle.selected[0]
    const syllableB = model.puzzle.selected[1]
    const tempR = syllableA.location.row
    const tempC = syllableA.location.col

    const indexA = calcIndex(syllableA)
    const indexB = calcIndex(syllableB)

    // Swap the syllables
    model.puzzle.syllables[indexA] = syllableB
    model.puzzle.syllables[indexB] = syllableA

    // Swap the locations
    syllableA.location.row = syllableB.location.row
    syllableA.location.col = syllableB.location.col
    syllableB.location.row = tempR
    syllableB.location.col = tempC

    model.mostRecentMoves.push([syllableA, syllableB])

    // check if the syllables are in correct location after swap
    for (let index = 0; index < model.puzzle.syllables.length; index++) {
        model.puzzle.checkCorrectLocation(index)
    }

    model.computeScore()
    model.numMoves += 1

    model.puzzle.selected = []

    return [indexA, indexB]
}

export function undoController(model: Model): boolean {
    if (model.mostRecentMoves.length === 0) {
        console.log("No recent moves to undo")
        return false
    }

    const mostRecentMoves = model.mostRecentMoves
    const syllableA = mostRecentMoves[mostRecentMoves.length - 1][0]
    const syllableB = mostRecentMoves[mostRecentMoves.length - 1][1]
    const tempR = syllableA.location.row
    const tempC = syllableA.location.col

    const indexA = calcIndex(syllableA)
    const indexB = calcIndex(syllableB)

    // Swap the syllables
    model.puzzle.syllables[indexA] = syllableB
    model.puzzle.syllables[indexB] = syllableA

    // Swap the locations
    syllableA.location.row = syllableB.location.row
    syllableA.location.col = syllableB.location.col
    syllableB.location.row = tempR
    syllableB.location.col = tempC

    model.mostRecentMoves.pop()

    // check if the syllables are in correct location after swap
    for (let index = 0; index < model.puzzle.syllables.length; index++) {
        model.puzzle.checkCorrectLocation(index)
    }

    model.computeScore()
    model.numMoves -= 1

    // remove already selected syllables if any
    model.puzzle.selected = []

    return true

}