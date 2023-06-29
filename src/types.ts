declare module 'express-serve-static-core' {
  interface Request {
    logIn(user: any, callback: (err: any) => void): void;
  }
}
