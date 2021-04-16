import Engine from './core/Engine';

const engine: Engine = new Engine();

window.onload = function () {
    engine.start(512, 512);
};

// window.onresize = function () {
//     engine.resize();
// };
