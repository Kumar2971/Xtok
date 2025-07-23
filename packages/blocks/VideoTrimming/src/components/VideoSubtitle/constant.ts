export enum VideoSubtitleTab {
  none,
  font,
  textSize,
  colors,
}

export const videoSubtitleTabs = [
  {
    label: 'Font',
    value: VideoSubtitleTab.font,
  },
  {
    label: 'Text Size',
    value: VideoSubtitleTab.textSize,
  },
  {
    label: 'Colors',
    value: VideoSubtitleTab.colors,
  },
];
