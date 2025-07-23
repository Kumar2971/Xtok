import { ImageSourcePropType } from "react-native";

interface LevelDataImage {
  id: number;
  filename: string;
  url: ImageSourcePropType;
  type: string;
}

interface LevelData {
  id: number;
  tier: number;
  level: number;
  coins: number;
  image: LevelDataImage;
}
export default interface LeaderboardModel  {
  donated_to: number;
  coins_count: number;
  url: null | ImageSourcePropType,
  user_name: string;
  order: number;
  level_data: LevelData;
}
