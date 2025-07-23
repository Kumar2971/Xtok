import React from 'react';
// Customizable Area Start
import {
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	View,
	Platform,
	FlatList,
	Modal,
	SafeAreaView,
	RefreshControl,
	TouchableWithoutFeedback,
} from 'react-native';
import {
	responsiveHeight,
	responsiveFontSize,
} from 'react-native-responsive-dimensions';

import FollowRequestController, { Props } from './FollowRequestController';
import { ProfilePicture, closeicon, left_arrow } from './assets';
import Scale from '../../../components/src/Scale';
import {translate} from '../../../components/src/i18n/translate'

export default class FollowRequest extends FollowRequestController {
	constructor(props: Props) {
		super(props);
	}

	renderItem = ({ item }: any) => {
		return (
			<View style={[styles.viewRow,

				{ flexDirection: 'row' },


			]}>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					flex:1
				}}>

				<Image
					source={
							item.attributes.photo !== null
							? {uri: item.attributes.photo}
							: ProfilePicture
					}
					style={styles.imageAvatar}
					resizeMode={'contain'}
					/>
					<View style={[{flex:1
					},this.state.language =='ar' && {
						alignItems:"flex-start"
					}]}>
				<Text numberOfLines={1} style={[styles.itemTitle,{marginHorizontal:10}]}>{item?.attributes?.user_name}</Text>
				<Text numberOfLines={1} style={[styles.itemSubTitle,{marginHorizontal:10,marginTop:5}]}>{item?.attributes?.bio ?? translate("noBio")}</Text>
				</View>
					</View>

				<TouchableOpacity
				testID='firstTouch'
					onPress={() => {
						this.setState({
							showConfirmModal: true,
							selectedItem: item
						})
					}}
				>
					<View style={[styles.viewButtonBg, styles.viewButtonBorder]}>
						<Text style={[styles.textButtonBg, styles.textButtonBorder]}>
							{translate("confirm")}
						</Text>
					</View>
				</TouchableOpacity>

			</View>
		);
	}
  emptyList = () => {
    if (!this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#000',
          }}>
              {translate("no_requests")}
          </Text>
        </View>
      );
    } else return null;

  };

	render() {
		return (
			// Customizable Area Start
			<SafeAreaView style={styles.mainCon}>
				<View style={[styles.headerCon,
					{flexDirection : 'row'}
				]}>
					<TouchableOpacity
					testID='secondTouch'
						style={[
							styles.headerView1,
						]}
						onPress={() => this.props.navigation.goBack()}
					>
						<Image
							source={left_arrow}
							style={[styles.leftArrow,this.state.language =='ar'&&{
								transform: [{ rotate: '180deg'}]
							}]}
							resizeMode='contain'
						/>
					</TouchableOpacity>
					<TouchableOpacity testID='thirdTouch' style={styles.headerView2} activeOpacity={0.6}>
						<Text style={styles.notificationText}>{translate("follow_Request")}</Text>
					</TouchableOpacity>
					<View style={styles.headerView1}>
						<View style={styles.leftArrow} />
					</View>
				</View>

				<View style={{ flex: 1, flexGrow: 1 }}>
					<FlatList
						data={this.state.listOfFollowRequests}
						renderItem={this.renderItem}
						keyExtractor={(item, index) => index.toString()}
						contentContainerStyle={{
              flexGrow: 1,
							paddingHorizontal: responsiveFontSize(2),
						}}
						style={{
              flex: 1,
							flexGrow: 1,
						}}
            ListEmptyComponent={this.emptyList()}
						refreshing={this.state.isLoading}
						refreshControl={
							<RefreshControl
								colors={['#9Bd35A', '#689F38']}
								refreshing={this.state.isLoading}
								onRefresh={() => this.getFollowRequest()}
							/>
						}
					/>
				</View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={this.state.showConfirmModal}
					onRequestClose={() => {
						this.setState({ showConfirmModal: false });
					}}
				>
					<TouchableWithoutFeedback
						onPress={() => {
							if (this.state.showConfirmModal == true)
								this.setState({ showConfirmModal: false })
						}
						}
					>
						<View style={styles.modalContainer}>
							<View style={styles.comment_ModalView}>
								<View style={{ flexDirection: 'row',justifyContent:'flex-end' }}>
									<TouchableOpacity
									testID='fourthTouch'
										onPress={() => {
											this.setState({ showConfirmModal: false })
										}}
									>
										 <Image source={closeicon} style={{height: 18, width: 18}} />
									</TouchableOpacity>
								</View>
								<View style={[styles.viewRow,{flexDirection:'column'}]}>
									<Image
										source={
											this.state.selectedItem !== null &&
												this.state.selectedItem.attributes.photo !== null
												? {uri: this.state.selectedItem.attributes.photo}
												: ProfilePicture
										}
										style={styles.imageAvatar}
										resizeMode={'contain'}
									/>
										<Text style={styles.itemTitle}>{this.state?.selectedItem?.attributes?.user_name}</Text>
								</View>
								<View style={[styles.viewRow, {marginTop: 15}]}>
									<TouchableOpacity
									testID='fifthTouch'
										style={{ flex: 1, marginRight: 10 }}
										onPress={() => {
											this.onConfirmUser(this.state?.selectedItem, 0)
										}}
									>
										<View style={[styles.viewButtonBg, styles.viewButtonBorder, {width: '100%'}]}>
											<Text style={styles.textButtonDialogue}>
												{translate("reject")}
											</Text>
										</View>
									</TouchableOpacity>
									<TouchableOpacity
									testID='sixthTouch'
										style={{ flex: 1, marginLeft: 10 }}
										onPress={() => {
											this.onConfirmUser(this.state?.selectedItem, 1)
										}}
									>
										<View style={[styles.viewButtonBg, styles.viewButtonBorder, {width: '100%'}]}>
											<Text style={styles.textButtonDialogue}>
												{translate("confirm")}
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
				{/* // Customizable Area End */}
			</SafeAreaView>
			// Customizable Area End
		);
	}
}

// Customizable Area Start
const styles = StyleSheet.create({
	mainCon: {
		flex: 1,
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
			},
		}),
	},
	headerCon: {
		alignItems: 'center',
		paddingHorizontal: 15,
		...Platform.select({
			ios: {
				height: responsiveHeight(7.5),
			},
			android: {
				height: responsiveHeight(6),
			},
		}),
		backgroundColor: '#fff',
	},
	headerView1: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerView2: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	leftArrow: {
		height: 30,
		width: 30,
	},
	notificationText: {
		fontSize: responsiveFontSize(2),
		color: '#000',
		fontWeight: 'bold',
	},
	// item styles
	viewRow: {
		alignItems: 'center',
		marginVertical: responsiveFontSize(1),
		flexDirection:'row',
		justifyContent: 'space-between',

	},
	imageAvatar: {
		height: responsiveHeight(7),
		width: responsiveHeight(7),
		borderRadius: responsiveFontSize(100),
	},
	viewCenterMain: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: responsiveFontSize(1.5),
	},
	itemTitle: {
		fontSize: responsiveFontSize(1.8),
		fontWeight: 'bold',
		color: '#000',
		// marginTop:10
	},
	itemSubTitle: {
		fontSize: responsiveFontSize(1.8),
		color: '#858585',
	},
	viewButtonBg: {
		borderRadius: 50,
		borderWidth: 0,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#fff',
		width: Scale(100),
		paddingVertical: Scale(8),
		backgroundColor: '#FFC924',
	},
	viewButtonBorder: {
		borderRadius: 50,
		borderWidth: 0,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#fff',
		width: Scale(100),
		paddingVertical: Scale(8),
		backgroundColor: '#FFC924',
	},
	textButtonBg: {
		fontSize: responsiveFontSize(1.5),
		fontWeight: 'bold',
		color: '#000',
	},
	textButtonDialogue: {
		fontSize: responsiveFontSize(1.8),
		fontWeight: 'bold',
		color: '#000',
	},
	textButtonBorder: {
		fontSize: responsiveFontSize(1.5),
		fontWeight: 'bold',
		color: '#000',
	},
	modalContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: "center",
		backgroundColor: "#00000040",
	},
	comment_ModalView: {
		backgroundColor: "white",
		borderRadius: 15,
		width: "80%",
		paddingHorizontal: 15,
		paddingVertical: 15,
	},
});
// Customizable Area End
