import Engine from './core/Engine';

const engine: Engine = new Engine();

window.onload = function () {
    engine.start();
};

// window.onresize = function () {
//     engine.resize();
// };
