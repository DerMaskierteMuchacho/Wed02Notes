export class tscript {

    hans(person: string, value: boolean) {
        let isDone: boolean = value;

        console.log("value is: " + value);

        return "hello " + person;
    }

    ueli()
    {
        this.hans("hans", true);

    }
}

export const typescriptTest = new tscript();