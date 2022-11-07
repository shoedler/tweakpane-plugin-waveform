# Tweakpane Waveform plugin

Waveform Monitor for [Tweakpane][tweakpane].

![plugin- essentials](https://user-images.githubusercontent.com/38029550/200204309-76ce8fd4-31a6-487d-b87f-0e868eda7a52.png)

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

![waveform](https://user-images.githubusercontent.com/38029550/200204325-734b04af-9b4a-4a53-972e-f3b1eabdd9a1.png)

```js
const params = {
  prop1: [ 5, 6, 7, 8, 9, 3, 9, 8, 7, 6, 5 ],
  prop2: new Uint8Array(8).fill(0).map((_, i) => Math.pow(2, i+1) - 1),
};

pane.addMonitor(params, 'prop1', {
  view: 'waveform',
  min: 0,
  max: 10,
  style: 'bezier',
  interval: 100,
})

pane.addMonitor(params, 'prop2', {
  view: 'waveform',
  min: 0,
  max: Math.pow(2, 8),
  interval: 500
})
```

[tweakpane]: https://github.com/cocopon/tweakpane/