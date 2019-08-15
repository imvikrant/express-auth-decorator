import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const app = express();
app.use(cookieSession({ name: 'sessionDetails', secret: 'vikrant' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('listening on port 3000....');
});
