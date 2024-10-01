export class Coordinate {
    row: number
    col: number
    constructor(row: number, col: number) {
        this.row = row
        this.col = col
    }
}

export class Syllable {
    isInCorrectLocation: boolean
    location: Coordinate
    content: string
    isStart: boolean

    constructor(content: string, isStart: boolean, row: number, col: number) {
        this.content = content
        this.isInCorrectLocation = false
        this.location = new Coordinate(row, col)
        this.isStart = isStart
    }


}

export class Puzzle {
    syllables: Syllable[]
    selected: Syllable[]
    solution: string[]

    constructor(syllables: Syllable[], solution: string[]) {
        this.syllables = syllables
        this.solution = solution
        this.selected = []
    }

    getLeftSyllables(syllableContent: string): string[] | any[] {
        let left = []
        for (let i = 0; i < this.solution.length; i++) {
            if (this.solution[i] === syllableContent) {
                let temp = i - 1
                let tempLeft = []
                while (this.solution[temp] != "&") {
                    tempLeft.push(this.solution[temp])
                    temp -= 1
                }
                if (tempLeft.length > 0) {
                    left.push(tempLeft)
                }
            }
        }
        return left
    }

    checkLeftSyllablesCorrect(index: number): boolean {
        const syllable = this.syllables[index]
        const leftSolutionSyllables = this.getLeftSyllables(syllable.content)
        let isCorrect = false
        let i: number = 0

        for (const leftSeq of leftSolutionSyllables) {
            isCorrect = false
            for (i = 0; i < leftSeq.length && i < syllable.location.col; i++) {
                if (leftSeq[i] === this.syllables[index - 1 - i].content && this.syllables[index - 1 - i].isInCorrectLocation) {
                    isCorrect = true
                }
                else {
                    isCorrect = false
                    break
                }
            }
            if (((isCorrect == true) && (i == leftSeq.length) && (i == syllable.location.col))) {
                this.syllables[index].isInCorrectLocation = true
                return true
            }
            else {
                isCorrect = false
            }
        }
        if (isCorrect) {
            this.syllables[index].isInCorrectLocation = true
            return true
        }
        else {
            this.syllables[index].isInCorrectLocation = false
            return false
        }
    }

    checkCorrectLocation(index: number): boolean {
        const syllable = this.syllables[index]
        // check start
        if (syllable.location.col === 0) {
            if (syllable.isStart) {
                this.syllables[index].isInCorrectLocation = true
                return true
            }
            else {
                return this.checkLeftSyllablesCorrect(index)
            }
        }
        else {
            return this.checkLeftSyllablesCorrect(index)
        }

    }
}

export class Model {
    puzzle: Puzzle
    numMoves: number
    score: number
    mostRecentMoves: Syllable[][]
    currentConfig: string


    constructor(info: any) {
        this.numMoves = 0
        this.score = 0
        this.mostRecentMoves = []
        this.currentConfig = info.name
        this.puzzle = new Puzzle(this.initiatePositions(info.initial, info.start), info.solution)
    }

    initiatePositions(initial: string[][], start: string[]): Syllable[] {
        let positions = []
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                positions.push(new Syllable(initial[i][j], start.includes(initial[i][j]), i, j))
            }
        }
        return positions
    }


    computeScore() {
        let tempScore = 0
        for (const syllable of this.puzzle.syllables) {
            if (syllable.isInCorrectLocation) {
                tempScore = tempScore + 1
            }
        }
        this.score = tempScore
    }


}