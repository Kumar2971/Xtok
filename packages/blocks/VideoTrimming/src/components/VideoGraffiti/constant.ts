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
  cute,
  fancy,
  cool,
}

export const videoTransitions = [
  {
    label: "Fancy",
    value: VideoTransitionType.fancy,
  },
  {
    label: "Cute",
    value: VideoTransitionType.cute,
  },
  {
    label: "Cool",
    value: VideoTransitionType.cool,
  },
];
