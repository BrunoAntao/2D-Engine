class MathLib {

    constructor() {}

    static getVar(list, v) {

        return list.map( item => item[v])
    }

    static getMin(list, v) {

        return Math.min(...this.getVar(list, v))
    }

    static getMax(list, v) {

        return Math.max(...this.getVar(list, v))
    }
}