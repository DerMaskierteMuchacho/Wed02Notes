// @ts-ignore
import express from 'express';
// @ts-ignore
import bodyParser from 'body-parser';
// @ts-ignore
import hbs from 'express-hbs';
// @ts-ignore
import cookieParser from 'cookie-parser';
import path from 'path';
import { registerHelpers } from './utils/handlebar-util.js';
import { overrideMiddleware } from "./utils/method-override.js";
import { noteRoutes } from "./routes/noteRoutes.js";
const app = express();
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', path.resolve('views'));
registerHelpers(hbs);
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(overrideMiddleware);
app.use(noteRoutes);
app.use(express.static(path.resolve('public')));
app.use(cookieParser());
const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
