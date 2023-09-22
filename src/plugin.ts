import {
  BaseMonitorParams,
  createPlugin,
  MonitorBindingPlugin,
  parseRecord,
  ValueMap,
} from '@tweakpane/core';
import {BindingReader} from '@tweakpane/core';

import {WaveformController} from './controller/waveform.js';
import {WaveformStyles, WaveformValue} from './view/waveform.js';

export interface WaveformMonitorParams extends BaseMonitorParams {
  max?: number;
  min?: number;
  style?: WaveformStyles;
}

function shouldShowWaveform(params: WaveformMonitorParams): boolean {
  return 'view' in params && params.view === 'waveform';
}

function isWaveformType(value: unknown): value is WaveformValue & boolean {
  if (typeof value === 'object') {
    return 'length' in (value as Record<string, unknown>);
  }
  return false;
}

export const WaveformPlugin: MonitorBindingPlugin<
  WaveformValue,
  WaveformMonitorParams
> = createPlugin({
  id: 'monitor-waveform',
  type: 'monitor',

  accept: (value, params) => {
    if (!isWaveformType(value)) {
      return null;
    }

    const result = parseRecord<WaveformMonitorParams>(
      params,
      (p) =>
        ({
          max: p.optional.number,
          min: p.optional.number,
          style: p.optional.custom<WaveformStyles>((value) =>
            value === 'linear' || value === 'bezier' ? value : undefined,
          ),
          view: p.optional.string,
        } as any), // TODO types
    );
    return result ? {initialValue: value, params: result} : null;
  },
  binding: {
    defaultBufferSize: (params) => (shouldShowWaveform(params) ? 64 : 1),
    reader:
      (_args): BindingReader<WaveformValue> =>
      (exValue: unknown): WaveformValue => {
        if (isWaveformType(exValue)) {
          return exValue as WaveformValue;
        }
        return [];
      },
  },
  controller: (args) => {
    return new WaveformController(args.document, {
      props: ValueMap.fromObject({
        max: ('max' in args.params ? args.params.max : null) ?? 100,
        min: ('min' in args.params ? args.params.min : null) ?? 0,
        lineStyle:
          ('style' in args.params ? args.params.style : null) ?? 'linear',
      }),
      value: args.value,
      viewProps: args.viewProps,
    });
  },
});
