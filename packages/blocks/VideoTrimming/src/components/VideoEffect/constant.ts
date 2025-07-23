import {background} from '../../assets';

export enum VideoEffectTab {
  split,
  dynamic,
  beautiful,
}

export const videoEffectTabs = [
  {
    label: 'Split Screens',
    value: VideoEffectTab.split,
    options: [
      {label: 'Fuzzy-split', image: background,commandString:`-filter_complex "[0:v]split=2[left][right];[left]gblur=sigma=20[left_blurred];[right][left_blurred]overlay=W/2"`},//s
      {label: 'Mirror', image: background,commandString:` -filter_complex "[0:v]split=2[left][right];[left]vflip[left_flipped];[right][left_flipped]hstack"`},//s
      {label: 'Dual', image: background,commandString:`-filter_complex "[0:v][1:v]hstack=inputs=2"`},
      {label: 'Three-split', image: background,commandString:`-filter_complex "[0:v]scale=iw/3:ih/3[top];[1:v]scale=iw/3:ih/3[middle];[2:v]scale=iw/3:ih/3[bottom];[top][middle]overlay=W/3:0[tmp1];[tmp1][bottom]overlay=W/3:H/3"`}, //s
      {label: 'Quarter', image: background,commandString:`-filter_complex "[0:v]split=4[top_left][top_right][bottom_left][bottom_right];[top_left][top_right]hstack[top];[bottom_left][bottom_right]hstack[bottom];[top][bottom]vstack"`},//s
    ],
  },
  {
    label: 'Dynamic',
    value: VideoEffectTab.dynamic,
    options: [
      {label: 'Soul out', image: background,commandString:`-vf "boxblur=10:5, colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131, curves=all='0/0 .5/.4 1/1'" -pix_fmt yuv420p -y`},//s
      {label: 'Moon', image: background,commandString:`-vf "colorchannelmixer=rr=0.8:rg=0.8:rb=0.8:gr=0.8:gg=0.8:gb=0.8:br=0.9:bg=0.9:bb=1.2" -pix_fmt yuv420p -y`},//s
      // {label: 'Flashing', image: background,commandString:`-vf "noise=alls=100:allf=t+u, vignette=PI/4"`},//s
       // {label: 'Glitch', image: background,commandString:'-vf "glitch=duration=1:offset=50, setpts=0.5*PTS"'},
      // {label: 'Hot Velvet', image: background,commandString:`-vf "noise=alls=100:allf=t+u, vignette=PI/4"`},//s
    ],
  },
  // {
  //   label: 'Beautiful',
  //   value: VideoEffectTab.beautiful,
  //   options: [
  //     {label: 'Rose', image: background,commandString:`-filter_complex "lutrgb=r=negval:g=negval:b=1.5*val+0.1[v]" -map "[v]"`},//s
  //     {label: 'Sea Wave', image: background,commandString:`-vf "lutrgb=r=val*1.2:g=val*0.8:b=val*0.9"`},//s
  //     {label: 'Hot', image: background,commandString:'-vf "lutrgb=r=val*1.5:g=val*1.2:b=val"'},//s
  //     {label: 'Bris', image: background,commandString:`-vf "lutrgb=r=val*1.1:g=val*1.1:b=val*1.1" `},//s
  //   ],
  // },
];
