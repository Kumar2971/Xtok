import React from "react";
// Customizable Area Start
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
	FlatList,
	RefreshControl,
	SafeAreaView,
	Dimensions
} from "react-native";
import { translate } from "../../../components/src/i18n/translate";
import {imgLeftArrow } from "../../PrivacySettings/src/assets";
let screenWidth = Dimensions.get('window').width; 
import { avatar } from "./assets";
import Scale from "../../../components/src/Scale";
import BlockedusersController, {
	Props,
	configJSON
} from "./BlockedusersController";
// Customizable Area End

export default class RestrictedUsers extends BlockedusersController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start

  topHeaderSettings = () => {
    const {language} = this.state;
    return (
      <View style={[styles.headercontainer, styles.divider]}>
        <TouchableOpacity testID="privacySafetyKey" onPress={() => this.props.navigation.navigate('PrivacySafety')}>
          <Image source={imgLeftArrow} style={[styles.backarrow_style_en,this.state.language =='ar' && styles.backarrow_style]} />
        </TouchableOpacity>
		 <Text style={styles.headerText}>{translate("restricted_Accounts")}</Text>
      </View>
    );
  };

	renderItem=(data:any)=>{
		const {item, index} = data;
		return (
			<View key={index} style={styles.userRow}>
				{/* placeholder image */}
				<Image
					source={
						item?.attributes?.photo
							? { uri: item.attributes.photo }
							: avatar
					}
					style={{
						height: 60,
						width: 60,
						borderRadius:999,
					}}
					resizeMode='contain'
				/>
				<View style={[styles.info]}>
					<Text style={[styles.nameText,this.state.language =='ar' && {
						textAlign:'left'
				}]}>
						{item?.attributes?.account?.user_name}
					</Text>

					<Text style={[styles.bioText,this.state.language =='ar' && {
						textAlign:'left'
				}]}>
						{item?.attributes?.account?.bio || translate("noBio")}
					</Text>
				</View>

				<TouchableOpacity
					testID={'btnViewBlockeduserTxt'}
					style={[
						styles.blockBtn]}
					onPress={() => {
						this.unrestrict(
							item.attributes.account_id,
							index
						);
					}}
				>
					<View>
						<Text
							style={[
								styles.blockBtnText
							]}
						>
							{translate("unrestrict")}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
  // Customizable Area End

  render() {
    return (
      //Merge Engine DefaultContainer
      <View style={styles.container}>
      {/* Customizable Area Start */}
			<SafeAreaView>

        {/* secondary text- full view centered */}
				{this.topHeaderSettings()}
          <Text style={styles.pageCaption}>{translate("Accounts_that_you_have_restricted")}</Text>
          <FlatList
					data={this.state.restrictedUsers}
					keyExtractor={(item: any) => item.id}
					renderItem={this.renderItem}
					refreshing={this.state.restrictedUsersLoading}
             onRefresh={this.getRestrictedUsers}
             refreshControl={<RefreshControl refreshing={this.state.restrictedUsersLoading}  onRefresh={this.getRestrictedUsers} />}
					/>
			</SafeAreaView>
      {/* Customizable Area End */}
      </View>
      //Merge Engine End DefaultContainer
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: "auto",
		marginRight: "auto",
		width: Platform.OS === "web" ? "75%" : "100%",
		maxWidth: 650,
	},
	pageCaption: {
		fontSize: 12,
		color: '#b4b4b4',
		textAlign: 'center',
		paddingHorizontal: 10,
	},
	backarrow_style: {
	transform: [{ rotate: "180deg" }]
    },
    backarrow_style_en:{
	width: Scale(25),
    height: Scale(25),
    resizeMode: "contain",
    },
	userRow: {
		padding: 15,
		marginVertical: 10,
		flexDirection: 'row',
		height: 75,
	},
	headercontainer: {
		flexDirection: "row",
		alignItems:'center',
		paddingHorizontal: Scale(15),
		height: Scale(40),
		width: '100%',
	  },
  headerText: {
    fontSize:Scale(18),
    fontWeight:'bold',
	width:screenWidth-Scale(60),
	textAlign:'center'
  },
  divider: {
    borderBottomColor: "#B7BBC0",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
	info: {
		height: 60,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: 15,
	},
	nameText: {
		fontSize: 16,
		marginBottom: 2,
		fontWeight: 'bold',
		fontFamily: 'Roboto-Medium',
	},
	bioText: {
		color: '#757575',
		fontSize: 13,
		fontFamily: 'Roboto-Medium',
	},
	blockBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fdca20',
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 50,
		marginTop: 10,
	},
	blockBtnText: {
		color: '#000',
		textAlign: 'center',
		fontSize: 14,
		fontWeight: 'bold',
		fontFamily: 'Roboto-Medium',
	},
	blockBtnUnblocked: {
		backgroundColor: 'white',
		borderColor: '#fdca20',
		borderWidth: 3,
		fontFamily: 'Roboto-Medium',
	},
	blockBtnTextUnblocked: {
		color: '#fdca20',
	},
	backrightarrow_style: {
		width: Scale(20),
		height: Scale(20),
		resizeMode: "contain"
	  },
});
// Customizable Area End
