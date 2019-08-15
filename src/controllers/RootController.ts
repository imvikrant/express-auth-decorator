import { get, controller, use } from './decorators';
import { Request, Response } from 'express';
import { authenticate } from './auth_middleware';

@controller('')
class RootController {
  @get('/')
  getHome(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      console.log('loged in session', req.session);
      res.send(`
        <div>
          <p>You are logged In</p>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
    } else {
      console.log('loged out session', req.session);
      res.send(`
        <div>
          <p>You are logged Out</p>
          <a href="/auth/login">Login</a>
        </div>
      `);
    }
  }

  @get('/protected')
  @use(authenticate)
  getProtected(req: Request, res: Response): void {
    res.send('You are authenticated');
  }
}
