export enum VideoTab {
  add,
  sort,
  canvas,
  speed,
  split,
  copy,
  freeze,
  mirror,
  audio,
  rotate,
  transitions,
  delete,
}

export enum VideoTransitionType {
  basics,
  mirror,
  effects,
  mask,
}

export const videoTransitions = [
  {
    label: 'Basics',
    value: VideoTransitionType.basics,
  },
  {
    label: 'Mirror',
    value: VideoTransitionType.mirror,
  },
  {
    label: 'Effects',
    value: VideoTransitionType.effects,
  },
  {
    label: 'Mask',
    value: VideoTransitionType.mask,
  },
];
