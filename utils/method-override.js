// @ts-ignore
import override from "method-override";

// @ts-ignore
export const overrideMiddleware = override(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
});