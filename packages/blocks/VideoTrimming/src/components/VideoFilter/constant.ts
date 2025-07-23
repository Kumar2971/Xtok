import { background } from "../../assets";

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
  portrait,
  scenery,
  food,
  style,
}

export const videoTransitions = [
  {
    label: "Portrait",
    value: VideoTransitionType.portrait,
    options: [
      { label: 'Clarendon', value: background, command_string: `` },
      { label: 'Gingham', value: background, command_string: `` },
      { label: 'Moon', value: background, command_string: `` },
      { label: 'Juno', value: background, command_string: `` },
    ]
  },
  {
    label: "Scenery",
    value: VideoTransitionType.scenery,
    options: [
      { label: 'Sepia', value: background, command_string:`-vf "colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131" -pix_fmt yuv420p -y` },
      { label: 'Sunset', value: background, command_string:` -vf "colorchannelmixer=rr=1.2:rg=0.4:rb=0.2:gr=0.3:gg=1.1:gb=0.2:br=0.2:bg=0.3:bb=1.4" -pix_fmt yuv420p -y` },
      { label: 'Panorama', value: background, command_string:`-vf "colorchannelmixer=rr=0.7:rg=0.3:rb=0.2:gr=0.2:gg=0.7:gb=0.3:br=0.2:bg=0.3:bb=0.7" -pix_fmt yuv420p -y` },
      { label: 'Nature', value: background, command_string:`-vf "colorchannelmixer=rr=1.2:rg=0.2:rb=0.1:gr=0.1:gg=1.2:gb=0.2:br=0.1:bg=0.2:bb=1.2" -pix_fmt yuv420p -y` },
    ]
  },
  {
    label: "Food",
    value: VideoTransitionType.food,
    options: [
      { label: 'LUT', value: background, command_string: `-vf "eq=brightness=0.3:saturation=1.9" -c:a copy` },
      { label: 'Pink', value: background, command_string: `-vf "colorchannelmixer=1:0:0:0:0:0:0:0:0" -pix_fmt yuv420p -y` },
      { label: 'Dark', value: background, command_string: `-vf "eq=brightness=-0.2:contrast=0.8" -c:a copy` },
      { label: 'Cam', value: background, command_string: `-vf "eq=brightness=-0.0:contrast=0.6" -c:a copy` },
      { label: 'Shot', value: background, command_string: `-vf "eq=brightness=-0.2:contrast=0.3" -c:a copy` },
      { label: 'Delicious', value: background, command_string: `-filter_complex "colorchannelmixer=.2:.2:.2:0:.3:.3:.3:0:.8:.8:.8" -pix_fmt yuv420p -y` },
    ]
  },
  {
    label: "Style",
    value: VideoTransitionType.style,
    options: [
      { label: 'Slumber', value: background ,command_string:`-vf "colorchannelmixer=.894:.482:-.051:0:.107:.983:-.090:0:.076:.407:.517" -pix_fmt yuv420p -y`},
      { label: 'Ludwig', value: background ,command_string:`-vf "colorchannelmixer=.6:.6:.6:0:.4:.4:.4:0:.6:.6:.6" -pix_fmt yuv420p -y`},
      { label: 'Crema', value: background ,command_string:`-vf "colorchannelmixer=.95:.05:0:0:.15:.85:0:0:.25:.75:0:0" -pix_fmt yuv420p -y`},
      { label: 'Aden', value: background,command_string:`-vf "colorchannelmixer=.75:.25:0:0:.25:.75:0:0:.25:.75:0:0" -pix_fmt yuv420p -y` },
      { label: 'Lark', value: background ,command_string:`-vf "colorchannelmixer=.3:.3:.3:0:.7:.7:.7:0:.1:.1:.1" -pix_fmt yuv420p -y`},
      { label: 'Lo-fi', value: background ,command_string:`-vf "colorchannelmixer=.6:.6:.6:0:.4:.4:.4:0:.3:.3:.3" -pix_fmt yuv420p -y`}
    ]
  },
];
