# Questions

Please detail what is wrong with the below code, and why. Also where applicable, mention what you would do differently?

```
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component, ClassAttributes } from "react";

const formattedSeconds = (sec: number) => {
    Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);
}

interface StopwatchProps extends ClassAttributes<Stopwatch> {
    initialSeconds: number;
}

class Stopwatch extends Component<StopwatchProps, any> {
    incrementer: any
    laps: any[]
    constructor(props: StopwatchProps) {
        super(props);
        this.state = {
            secondsElapsed: props.initialSeconds,
            lastClearedIncrementer: null,
        }
        this.laps = [];
    }

    handleStartClick() {
        this.incrementer = setInterval(() =>
        this.setState({
            secondsElapsed: this.state.secondsElapsed + 1,
        }), 1000);
    }

    handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer,
        });
    }

    handleResetClick() {
        clearInterval(this.incrementer);
        this.laps = [],
        this.setState({
            secondsElapsed: 0,
        });
    }

    handleLabClick() {
        this.laps = this.laps.concat([this.state.secondsElapsed]);
        this.forceUpdate();
    }

    handleDeleteClick(index: number) {
         return () => this.laps.splice(index, 1);
    }

    render() {
        const {
            secondsElapsed,
            lastClearedIncrementer,
        } = this.state;

        return (
            <div className="stopwatch">
                <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>

                {
                    (secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? <button type= "button" className="start-btn" onClick = {this.handleStartClick}>start</button> : <button type="button" className="stop-btn" onClick={this.handleStopClick}>stop</button>)
                }

                {
                    (secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? <button type= "button" onClick = {this.handleLabClick} >lap</button> : null)
                }

                {
                    (secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? <button type= "button" onClick = {this.handleResetClick} >reset</button> : null)
                }

                <div className="stopwatch-laps">

                {
                    this.laps && this.laps.map((lap, i) => <Lap index={ i+ 1} lap = { lap } onDelete = {this.handleDeleteClick(i)}/>)
                }
                </div>
            </div>
        );
    }
}

const Lap = (props: { index: number, lap: number, onDelete: () => {} }) => (
    <div key={props.index} className="stopwatch-lap">
        <strong>{props.index}</strong>/ {formattedSeconds(props.lap)} <button onClick={props.onDelete} > X </button>
    </div>
);

ReactDOM.render(
    <Stopwatch initialSeconds={0} />,
    document.getElementById("content"),
);
```

# My answer

- Type should not be any when using typescript. Otherwise, there is no point of using it.

- There is quite a few of logic mixing up with the UI, that makes it hard to read, debug and test.

- The structure of this project should be more organised. A good folder structure is more readable, maintainable and scalable as well as easier to test. For example helper function like formattedSeconds could be in the helper folder. Lap could be a new component(with its own folder) inside the components folder. Seperation of concerns is always a good design partern/principle to be aware.

- Index should not be using as key, especially using it to mutate data, or it will cause some serious UI issues in certain scenarios. Unless the list is a static list and will not change. In this case, it uses index to delete individual lap, so the UI will not work properly after deleting a few laps. It's better to use unique id to remove each item.

- Functional component(react hooks) is a better choice that is much easier to read and test, also end up with less code, there also may be a performance boost for functional component as the React team mentioned before.

- Using alternative state management could be benificial, such as context api or redux/toolkit, it might sound like a lot for using redux for this small project, even context api is good enough for this. On the other hand, redux toolkit is definitely one of the efficient state management libraries to be adaptive for big projects. This is why I took this chance to learn redux toolkit and typescript with very little prior knowledge and applied them on spot into this test.

# Conclusion

I might not be the most experienced candidate, but as it happens more and more often that I did something I thought I was not able to solove and achieve, this is when I know I am ready to become a developer.

Please feel free to view my version of code for this test, here is my attached demo link: https://stopwatch-technical-test.netlify.app

I am looking forward to hearing from you. Thank you!
