[![npm version](https://badge.fury.io/js/tweakpane-plugin-waveform.svg)](https://badge.fury.io/js/tweakpane-plugin-waveform)

# Tweakpane Waveform plugin

Waveform Monitor for [Tweakpane][tweakpane].

![tweakpane-plugin-waveform](https://user-images.githubusercontent.com/38029550/200271366-554d49f7-171a-4e85-beee-08b9b3a12bd5.png)

## Installation

### Browser
```html
<script src="tweakpane.min.js"></script>
<script src="tweakpane-plugin-waveform.min.js"></script>
<script>
  const pane = new Tweakpane.Pane();
  pane.registerPlugin(TweakpaneWaveformPlugin);
</script>
```

### Package

```js
import {Pane} from 'tweakpane';
import * as WaveformPlugin from '@tweakpane/plugin-waveform';

const pane = new Pane();
pane.registerPlugin(WaveformPlugin);
```

## Usage

![tweakpane-plugin-waveform-readme-sample](https://user-images.githubusercontent.com/38029550/200271415-5abf541d-6454-4df4-bd03-f09729a397d3.png)

```js
const params = {
  prop1: [ 5, 6, 7, 8, 9, 3, 9, 8, 7, 6, 5 ],
  prop2: new Uint8Array(8).fill(0).map((_, i) => Math.pow(2, i+1) - 1),
};

pane.addBinding(params, 'prop1', {
  view: 'waveform',
  min: 0,
  max: 10,
  style: 'bezier',
  interval: 100,
})

pane.addBinding(params, 'prop2', {
  view: 'waveform',
  min: 0,
  max: Math.pow(2, 8),
  interval: 500
})
```

[tweakpane]: https://github.com/cocopon/tweakpane/
