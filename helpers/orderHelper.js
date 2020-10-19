import {noteStore} from '../services/noteStore.js'

export class OrderHelper {
    orderByDueDate(array) {
        return array.sort(function (a, b) {
            return new Date(b.dueDate) - new Date(a.dueDate);
        });
    }

    orderByCreationDate(array) {
        return array.sort(function (a, b) {
            return new Date(b.creationDate) - new Date(a.creationDate);
        });
    }

    orderByImportance(array) {
        return array.sort(function (a, b) {
            return b.importance - a.importance;
        });
    }

}

export const orderHelper = new OrderHelper();