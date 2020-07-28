import React, {Component} from 'react';

class AudioVisualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
    }

    componentDidUpdate() {
        this.draw();
    }

    draw() {
        const {audioData} = this.props;
        const nSlices = 22;
        let indexIncrement = audioData.length / nSlices
        const sample = [...Array(nSlices)].map((_, i) => Math.round(i * indexIncrement))
            .map((value) => audioData[value])
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceGraphicWidth = 5;
        const sliceWidth = (width * 1.0) / sample.length;
        const slicePadding = sliceWidth - sliceGraphicWidth

        context.fillStyle = 'gray';
        context.clearRect(0, 0, width, height);

        context.beginPath();
        for (const item of sample) {
            const y = Math.min(-Math.abs(((item / 255.0) * height) - (height / 2)) + (height / 2), 145);
            const sliceHeight = Math.max(((height / 2) - y) * 2, 5)
            context.rect(x + (slicePadding / 2), y, sliceGraphicWidth, sliceHeight)
            x += sliceWidth;
        }
        context.fill()
    }

    render() {
        return <canvas width="300" height="300" ref={this.canvas}/>;
    }
}

export default AudioVisualiser;
