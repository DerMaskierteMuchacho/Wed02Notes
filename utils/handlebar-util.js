// @ts-ignore
export function registerHelpers(hbs) {
    // @ts-ignore
    hbs.registerHelper('if_eq', function (a, b, opts) {
        if (a === b)
            { // @ts-ignore
                return opts.fn(this);
            }
        else
            { // @ts-ignore
                return opts.inverse(this);
            }
    });
}