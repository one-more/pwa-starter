declare module 'redux-catch' {
    import { Middleware } from 'redux';
    export default function reduxCatch(cb: Function): Middleware;
}
