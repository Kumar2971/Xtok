import { PixelRatio, Dimensions } from 'react-native';

export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

let artBoardHeightOrg = 844;
let artBoardWidthOrg = 390;

let artBoardWidth = isRatioSame() ? artBoardWidthOrg : screenWidth;
let artBoardHeight = isRatioSame() ? artBoardHeightOrg : screenHeight;

function isRatioSame(): boolean {
  return (
    artBoardWidthOrg / artBoardHeightOrg < 1 && screenWidth / screenHeight < 1
  );
}


export function DynamicDimension(
    originalDimen: number,
    compareWithWidth: boolean,
    resizeFactor: number
  ): number | undefined {
    if (originalDimen != null) {
      if (resizeFactor != null) {
        originalDimen *= resizeFactor;
      }
      const compareArtBoardDimenValue = compareWithWidth
        ? artBoardWidth
        : artBoardHeight;
      const artBoardScreenDimenRatio =
        (originalDimen * 100) / compareArtBoardDimenValue;
      let compareCurrentScreenDimenValue = compareWithWidth
        ? screenWidth
        : screenHeight;
      return PixelRatio.roundToNearestPixel(
        (artBoardScreenDimenRatio * compareCurrentScreenDimenValue) / 100
      );
    }
    return;
  }