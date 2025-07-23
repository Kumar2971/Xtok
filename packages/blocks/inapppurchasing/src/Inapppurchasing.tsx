// Customizable Area Start
import React from "react";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from "react-native";
import Scale from "../../../components/src/Scale";

import InapppurchasingController, {
  PreMadePackages,
  Props,
  configJSON,
} from "./InapppurchasingController";
import { StarCoins, TikTokCoinIcon } from "./assets"
import FONTS from "../../../components/src/Fonts/Fonts";

export default class Inapppurchasing extends InapppurchasingController {
  constructor(props: Props) {
    super(props);
  }

  renderProductItem = ({item} : {item : PreMadePackages})=> {
    const showLoader = (this.state.selectedProductId === item.product_id)
    return(
    <View style={[styles.flatListParent]}>
      <View style={styles.iconWidth}>
        <Image source={StarCoins} style={styles.starIcon} />
      </View>
      <View style={styles.rightContainer}>
      <View style={styles.contentWidth}>
        <View style={styles.coinDescription}>
          <Image source={TikTokCoinIcon} style={styles.tikTokIcon} />
          <Text style={styles.coinName}>{item.total_coins}</Text>
        </View>
        <TouchableOpacity 
          disabled={showLoader}
          style={styles.payButton} testID="purchase" 
          onPress={() => {this.purchase(item.product_id)}}>
            {showLoader ? 
              <ActivityIndicator size={"small"} color={"black"}/>
            :
            <Text style={styles.price}>${item.coins_worth_value}</Text>
            }
        </TouchableOpacity>
      </View>
      {showLoader &&<Text style={styles.purchasingMsg}>
          Please wait a moment. Purchasing in progress...
      </Text>}
      </View>
    </View>)
  }


  render() {
    // Merge Engine - render - Start
    return (
      <View style={styles.mainContainer}>
        <FlatList
          testID="productList"
          data={this.state.productDetails}
          renderItem={this.renderProductItem}
          keyExtractor={item => item.product_id}
          showsVerticalScrollIndicator = {false}
        />
      </View>
    );
    // Merge Engine - render - End
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex : 1 
  },
  flatListParent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingVertical: Scale(10),
    marginBottom: Scale(10),
    borderColor: '#FFC925',
    borderRadius: Scale(10),
    borderWidth: Scale(1)
},
starIcon:{ 
  width: Scale(80), 
  height: Scale(80), 
  marginRight: 5 
},
iconWidth : { width: '25%' },
rightContainer: {
  width:"75%",
  marginVertical : Scale(5),
  height : "100%" 
},
contentWidth : { 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'space-between', 
  alignContent: 'center', 
},
tikTokIcon : { 
  width: Scale(30), 
  height: Scale(30), 
  marginRight: Scale(5) 
},
coinDescription : { 
  display: 'flex', 
  flexDirection: 'row', 
  alignContent: 'center', 
  marginVertical: Scale(5) 
},
coinName : { 
  fontSize: Scale(20), 
  fontFamily: FONTS.MontserratSemiBold,
  color: "black"
},
payButton: { 
  backgroundColor: '#FFC925', 
  paddingVertical: 4, 
  paddingHorizontal: 20, 
  borderRadius: 6, 
  marginRight: 5 
},
price: { 
  fontFamily: FONTS.MontserratBold, 
  color: "black" 
},
purchasingMsg: { 
  display: 'flex', 
  fontSize: Scale(10), 
  flexWrap: 'wrap', 
  marginVertical: Scale(5), 
  marginBottom: Scale(10), 
  fontFamily: FONTS.MontserratRegular, 
  color: "black",
  textAlign:"left",
}

});

// Customizable Area End
