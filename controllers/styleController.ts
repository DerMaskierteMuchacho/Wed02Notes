export class StyleController {
    private styles: string[];

    constructor() {
        this.styles = ["default", "dark"];
    }

    getStyles() {
        return this.styles;
    }

    getNextStyle(currentStyle: string) {
        let index = this.styles.indexOf(currentStyle);
        index = index < this.styles.length - 1 ? index + 1 : 0;

        return this.styles[index];
    }
}

// @ts-ignore
export const styleController = new StyleController();