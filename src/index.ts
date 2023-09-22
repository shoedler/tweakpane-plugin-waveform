import {TpPlugin} from '@tweakpane/core';

import {WaveformPlugin} from './plugin.js';

export const id = 'waveform';

export const css = '__css__';

export const plugins: TpPlugin[] = [WaveformPlugin];
