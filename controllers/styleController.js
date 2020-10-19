export class StyleController {

    constructor() {
        this.styles = ["default", "dark"];
        this.currentStyle = "default";
    }

    getStyles()
    {
        return this.styles;
    }

    getStyle() {
        //https://www.tutorialspoint.com/expressjs/expressjs_cookies.htm
        return this.currentStyle;
    };

    switchStyle(style)
    {
        this.currentStyle = style;
    }
}
export const styleController = new StyleController();
