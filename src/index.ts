/* eslint-disable @typescript-eslint/no-namespace */
import Engine from './lib/Engine';

window.onload = function () {
    const e = new Engine();
    e.start();
    document.body.innerHTML += 'Prout';
};
