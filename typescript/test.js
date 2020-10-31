export class tscript {
    hans(person, value) {
        let isDone = value;
        console.log("value is: " + value);
        return "hello " + person;
    }
    ueli() {
        this.hans("hans", true);
    }
}
export const typescriptTest = new tscript();
