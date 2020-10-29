import {noteStore} from '../services/noteStore.js'

export class OrderHelper {

    constructor() {
        this.dueDateDesc = false;
        this.creationDateDesc = false;
        this.importanceDesc = false;
    }

    orderByDueDate(array) {
        var result = array.sort(function (a, b) {
            return new Date(b.dueDate) - new Date(a.dueDate);
        });

        result = (!this.dueDateDesc) ? result: result.reverse();
        this.dueDateDesc = !this.dueDateDesc
        return result;
    }

    orderByCreationDate(array) {
        var result = array.sort(function (a, b) {
            return new Date(b.creationDate) - new Date(a.creationDate);
        });

        result = (!this.creationDateDesc) ? result: result.reverse();
        this.creationDateDesc = !this.creationDateDesc
        return result;
    }

    orderByImportance(array) {
        var result = array.sort(function (a, b) {
            return b.importance - a.importance;
        });

        result = (!this.importanceDesc) ? result: result.reverse();
        this.importanceDesc = !this.importanceDesc
        return result;
    }

}

export const orderHelper = new OrderHelper();