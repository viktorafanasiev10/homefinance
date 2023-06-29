import express, {
  Request,
  Response
} from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import { database } from './config/database';
import { User } from './models';
import router from './router'
const app = express();
const port = 3000;

database
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    return database.sync({ force: false });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

passport.use(new LocalStrategy((username: string, password: string, done: any) => {
  User.findOne({ where: { username: username } })
    .then(user => {
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err: any, result: boolean) => {
        if (err) throw err;
        if (result) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
    .catch(err => done(err));
}));

passport.serializeUser((user: any, cb: any) => {
  cb(null, user.id);
});

passport.deserializeUser((id: string, cb: any) => {
  User.findByPk(id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
});

app.use(express.json());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
