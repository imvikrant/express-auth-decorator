import { Request, Response, NextFunction } from 'express';
import { controller, get, use, post } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" id="email">
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password">
        </div>
        <button type="submit">Submit</button>
      </form>
    `);
  }

  @post('/login')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email === 'tnarkiv.pradhan@gmail.com' && password === 'vikrant') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.status(404).send('Invalid credentials');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect('/');
  }
}
