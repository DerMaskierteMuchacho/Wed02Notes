export class StyleController {

    constructor() {
        this.styles = ["default", "dark"];
    }

    getStyles()
    {
        return this.styles;
    }

    getNextStyle(currentStyle)
    {
        let index = this.styles.indexOf(currentStyle);
        index = index < this.styles.length-1 ? index+1: 0;

        return this.styles[index];
    }
}
export const styleController = new StyleController();
