import Engine from './core/engine';

const engine: Engine = new Engine();

window.onload = function () {
    engine.start();
};

// window.onresize = function () {
//     engine.resize();
// };
