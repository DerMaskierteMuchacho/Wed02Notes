export class IndexHelper {

    private dueDateDesc: boolean;
    private creationDateDesc: boolean;
    private importanceDesc: boolean;

    constructor() {
        this.dueDateDesc = false;
        this.creationDateDesc = false;
        this.importanceDesc = false;
    }

    orderByDueDate(array: any) {
        let result = array.sort(function (a: any, b: any) {
            // @ts-ignore
            return new Date(b.dueDate) - new Date(a.dueDate);
        });

        result = (!this.dueDateDesc) ? result : result.reverse();
        this.dueDateDesc = !this.dueDateDesc
        return result;
    }

    orderByCreationDate(array: any) {
        let result = array.sort(function (a: any, b: any) {
            // @ts-ignore
            return new Date(b.creationDate) - new Date(a.creationDate);
        });

        result = (!this.creationDateDesc) ? result : result.reverse();
        this.creationDateDesc = !this.creationDateDesc
        return result;
    }

    orderByImportance(array: any) {
        let result = array.sort(function (a: any, b: any) {
            return b.importance - a.importance;
        });

        result = (!this.importanceDesc) ? result : result.reverse();
        this.importanceDesc = !this.importanceDesc
        return result;
    }

}

export const indexHelper = new IndexHelper();
// @ts-ignore