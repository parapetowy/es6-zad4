"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            watch: null,
            savedTimes: []
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "getFormattedTime",
        value: function getFormattedTime() {
            return pad0(this.state.times.minutes) + ":" + pad0(this.state.times.seconds) + ":" + pad0(Math.floor(this.state.times.miliseconds));
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true,
                    watch: setInterval(function () {
                        return _this2.step();
                    }, 10)
                });
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({
                running: false
            });
            clearInterval(this.state.watch);
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: "calculate",
        value: function calculate() {
            this.setState({
                times: {
                    miliseconds: this.state.times.miliseconds + 1
                }
            });
            if (!this.state.times.miliseconds >= 100) {
                this.setState({
                    times: {
                        seconds: this.state.times.seconds + 1,
                        miliseconds: this.state.times.miliseconds = 0
                    }
                });
            };
            if (!this.state.times.seconds >= 60) {
                this.setState({
                    times: {
                        minutes: this.state.times.minutes + 1,
                        seconds: this.state.times.seconds = 0
                    }
                });
            }
        }
    }, {
        key: "resetStopwatch",
        value: function resetStopwatch() {
            this.setState({
                running: true,
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: "write",
        value: function write() {
            save(this.format(this.times));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "nav",
                    { "class": "controls" },
                    React.createElement(
                        "a",
                        { href: "#", "class": "button", id: "start", onClick: this.start.bind(this) },
                        "Start"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", "class": "button", id: "stop", onClick: this.stop.bind(this) },
                        "Stop"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", "class": "button", id: "reset", onClick: this.resetStopwatch.bind(this) },
                        "Reset"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", "class": "button", id: "write" },
                        "Write"
                    )
                ),
                React.createElement(
                    "div",
                    { "class": "stopwatch" },
                    this.getFormattedTime() /* mm:ss:ms */
                ),
                React.createElement("ul", { "class": "results" })
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

function save(timer) {
    var res = document.createElement('li');
    res.innerText = timer;

    var tab = document.querySelector('.results');
    tab.insertBefore(res, tab.childNodes[0]);
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById("app"));

/*const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'));*/

// let stopwatch = React.createElement(Stopwatch);
// ReactDOM.render(stopwatch, document.querySelector('.stopwatch'));

// let startButton = document.getElementById('start');
// startButton.addEventListener('click', () => stopwatch.start());

// let stopButton = document.getElementById('stop');
// stopButton.addEventListener('click', () => stopwatch.stop());

// let resetButton = document.getElementById('reset');
// resetButton.addEventListener('click', () => stopwatch.reset());

// let writeButton = document.getElementById('write');
// writeButton.addEventListener('click', () => stopwatch.write());
