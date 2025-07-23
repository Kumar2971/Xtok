import React from 'react';
import {
	BackHandler,
	FlatList,
	Image,
	KeyboardAvoidingView,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import HashTagScreenController, { Props } from './HashTagScreenController';
import { COLORS } from "../../../framework/src/Globals";
import Scale from '../../../components/src/Scale';
import { imgLeftArrow } from './assets';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { getStorageData } from "../../../framework/src/Utilities";
import { translate } from "../../../components/src/i18n/translate";

export default class HashTagScreen extends HashTagScreenController {
	constructor(props: Props) {
		super(props);
		// Customizable Area Start
		// Customizable Area End
  }

  async componentDidMount() {
    // Customizable Area Start
    super.componentDidMount();
    this.props.navigation.addListener('focus', async() => {
      const userID=await getStorageData('userID',false)||''
      console.log({userID})

    })
    this.props.navigation.addListener('blur', () => {
      this.setState({
        trendingPosts: [],
        trendingLoading: false,
        recentPosts:[],
        recentLoading:false,
      })
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // Customizable Area End
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

	// Customizable Area Start
	topHeaderMain = () => {
		return (
			<View style={styles.headercontainer}>
				<TouchableOpacity testID='backPrs'
					onPress={() => this.props.navigation.goBack()}
					style={styles.backarrow_stylebtn}
				>
					<Image source={imgLeftArrow} style={[styles.backarrow_style,this.state.language==="ar" && styles.backArrow_ar]} />
				</TouchableOpacity>
				<Text style={styles.headerText}>{translate("search")}</Text>
				<View style={styles.backarrow_stylebtn} />
			</View>
		);
	};
	// Customizable Area End

	// Customizable Area Start
	headerNamePost = () => {
		return (
			<View style={styles.profileContainer}>
				<Text style={styles.textTitleTop}>{`#${this.state.hashTag}`}</Text>
				<Text style={styles.textSubTitleTop}>{`${this.state.posts} ${this.state.posts > 1 ? translate("postsTextInSmallLetter") : translate("post")}`}</Text>
			</View>
		);
  };
	// Customizable Area End

	// Customizable Area Start
  followButton = () => {
    return (
      <TouchableOpacity
        style={styles.viewButton}>
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
          <Text style={styles.textButton}>{'Follow'}</Text>
        </View>
      </TouchableOpacity>
    )
  }
	// Customizable Area End

	// Customizable Area Start
  tabsButton = () => {
    return (
      <View style={styles.toggleContainer_Style}>
				<View style={styles.toggleBoxImage_Style}>
					<TouchableOpacity testID='post'
						style={[styles.viewFlexCenter, { borderBottomWidth: this.state.showTab === 0 ? 3 : 2, borderBottomColor: this.state.showTab === 0 ? COLORS.yellow : '#EEEEEE' }]}
						onPress={() => {
							this.setState({ showTab: 0 })
							this.getTopPosts(this.state.hashTag)
						}}
					>
            <Text style={[styles.tabTitle, {color: this.state.showTab === 0 ? '#FFD74C' : '#000'}]}>{translate("top")}</Text>
          </TouchableOpacity>
					<TouchableOpacity testID='trending'
						style={[styles.viewFlexCenter, { borderBottomWidth: this.state.showTab === 1 ? 3 : 2, borderBottomColor: this.state.showTab === 1 ? COLORS.yellow : '#EEEEEE' }]}
						onPress={() => {
							this.setState({showTab: 1})
							this.getTrendingPosts(this.state.hashTag)
						}}>
						<Text style={[styles.tabTitle, { color: this.state.showTab === 1 ? '#FFD74C' : '#000' }]}>{translate("Trending")}</Text>
          </TouchableOpacity>
					<TouchableOpacity testID='recentPost'
						style={[styles.viewFlexCenter, { borderBottomWidth: this.state.showTab === 2 ? 3 : 2, borderBottomColor: this.state.showTab === 2 ? COLORS.yellow : '#EEEEEE' }]}
						onPress={()=> {
							this.setState({ showTab: 2 })
							this.getRecentPosts(this.state.hashTag)
						}}>
						<Text style={[styles.tabTitle, { color: this.state.showTab === 2 ? '#FFD74C' : '#000' }]}>{translate("recent")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
	// Customizable Area End

	// Customizable Area Start
  renderItem=(data:any)=>{
    const {item}=data
    return (
			<TouchableOpacity
				testID={'renderItemPress'}
				style={styles.post_container}
				onPress={() => {
					let isSearchFrom = '';
					if (this.state.showTab === 0) {
						isSearchFrom = 'hashtag_top'
					} else if (this.state.showTab === 1) {
						isSearchFrom = 'hashtag_trending'
					} else {
						isSearchFrom = 'hashtag_recent'
					}
					this.props.navigation.navigate('Comments', {
            type: 'SearchActivity',
						account_id:item?.attributes?.account_id,
						post_id: item?.id,
            searchItem: this.state.hashTag,
						isSearchFrom: isSearchFrom,
          })
				}}
			>
      	<Image source={{uri:item?.attributes?.post_medias?.thumnails?.[0]}} style={styles.post_image} />
      </TouchableOpacity>
    )
  }
	// Customizable Area End

	// Customizable Area Start
  keyExtractor=(item:any)=>{
    return item.id
  }
	// Customizable Area End

	// Customizable Area Start
  onTopListEndReached = () => {
    if (this.state.topPageNumber <= this.state.topLastPage) {
      this.getTopPosts(this.state.hashTag)
    }
	};

	onTrendingListEndReached = () => {
    if (this.state.trendingPageNumber <= this.state.trendingLastPage) {
      this.getTrendingPosts(this.state.hashTag)
    }
  };

	onRecentListEndReached = () => {
    if (this.state.recentPageNumber <= this.state.recentLastPage) {
      this.getRecentPosts(this.state.hashTag)
    }
  };
	// Customizable Area End

	// Customizable Area Start
  renderTopList = () => {
    return (
      <FlatList testID='listtop'
        numColumns={3}
        data={this.state.topPosts}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        refreshing={this.state.topLoading}
        onRefresh={() => {
					this.getTopPosts(this.state.hashTag)
				}}
				ListEmptyComponent={this.emptyList()}
				// contentContainerStyle={{ paddingTop: Scale(80)}}
        // onEndReachedThreshold={Platform.OS == "ios" ? 0 : 1}
        onEndReached={this.onTopListEndReached}
        refreshControl={
          <RefreshControl
            refreshing={this.state.topLoading}
            onRefresh={() => {
							this.getTopPosts(this.state.hashTag)
						}}
          />
        }
      />
    )
  }
	// Customizable Area End

	// Customizable Area Start
  renderTrendingList = () => {
    return (
      <FlatList testID='trendingPost'
        numColumns={3}
        data={this.state.trendingPosts}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        refreshing={this.state.trendingLoading}
        onRefresh={() => {
					this.getTrendingPosts(this.state.hashTag)
				}}
				ListEmptyComponent={this.emptyList()}
				// contentContainerStyle={{ flexGrow: 1, paddingVertical: Scale(10)}}
        onEndReachedThreshold={Platform.OS == "ios" ? 0 : 0.1}
        onEndReached={this.onTrendingListEndReached}
        refreshControl={
          <RefreshControl testID='refresh'
            refreshing={this.state.trendingLoading}
            onRefresh={() => {
							this.getTrendingPosts(this.state.hashTag)
						}}
          />
        }
      />
    )
  }
	// Customizable Area End

	// Customizable Area Start
  emptyList = () => {
    return (
      <View  style={styles.emptyList}>
        <Text style={{ fontWeight: "bold" }}>{`No posts found for #${this.state.hashTag}`}</Text>
      </View>
    );
  };
  renderRecentList = () => {
    return (
      <FlatList testID='recent'
        numColumns={3}
        data={this.state.recentPosts}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        refreshing={this.state.recentLoading}
        onRefresh={() => {
					this.getRecentPosts(this.state.hashTag)
				}}
				ListEmptyComponent={this.emptyList()}
				// contentContainerStyle={{ flexGrow: 1, paddingVertical: Scale(10)}}
        onEndReachedThreshold={Platform.OS == "ios" ? 0 : 0.1}
        onEndReached={this.onRecentListEndReached}
        refreshControl={
          <RefreshControl
            refreshing={this.state.recentLoading}
						onRefresh={() => {
							this.getRecentPosts(this.state.hashTag)
						}}
          />
        }
      />
    )
  }
	// Customizable Area End

	render() {
		return (
			<KeyboardAvoidingView
				behavior={this.isPlatformiOS() ? 'padding' : undefined}
				style={{ flex: 1 }}
			>
				<ScrollView
					keyboardShouldPersistTaps='always'
					contentContainerStyle={styles.container}
				>
					<TouchableWithoutFeedback testID='hideKey'
						onPress={() => {
							this.hideKeyboard();
						}}
					>
						<SafeAreaView style={{ flex: 1 }}>
							{this.topHeaderMain()}
							{this.headerNamePost()}
							{this.tabsButton()}
							{this.state.showTab === 0
								? this.renderTopList()
								: this.state.showTab === 1
								? this.renderTrendingList()
								: this.renderRecentList()}
						</SafeAreaView>
						{/* Customizable Area End */}
					</TouchableWithoutFeedback>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}
}

// Customizable Area Start
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	// top back style
	headercontainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Scale(15),
		paddingVertical: Scale(15),
		width: '100%',
		borderBottomColor: '#b7b7b7',
		borderBottomWidth: 1,
	},
	headerText: {
		fontSize: Scale(18),
		fontWeight: 'bold',
		color: "#000000",
	},
	backarrow_stylebtn: {
		width: Scale(25),
		height: Scale(25),
		justifyContent: 'center',
		alignItems: 'center',
	},
	backarrow_style: {
		width: Scale(25),
		height: Scale(25),
		resizeMode: "contain",
	},
	backArrow_ar: {
		transform:[{rotate:"180deg"}]
	},

	// top header
	profileContainer: {
		alignItems: 'center',
		marginTop: Scale(15),
	},
	textTitleTop: {
		fontSize: Scale(18),
		marginTop: Scale(15),
		fontWeight: 'bold',
	},
	textSubTitleTop: {
		fontSize: Scale(15),
		fontWeight: 'bold',
		marginTop: Scale(10),
	},
	viewButton: {
		marginTop: Scale(15),
		borderRadius: Scale(100),
		marginHorizontal: Scale(35),
		backgroundColor: '#FFD74C',
		paddingHorizontal: Scale(15),
		paddingVertical: Scale(10),
	},
	textButton: {
		color: '#000',
		fontSize: Scale(15),
		fontWeight: 'bold',
	},

	// tab bar style
	toggleContainer_Style: {
		borderColor: '#F2F2F2',
		borderTopWidth: Scale(2),
		borderBottomWidth: Scale(2),
		borderLeftWidth: 0,
		borderRightWidth: 0,
		width: '100%',
		height: Scale(40),
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: Scale(30),
	},
	toggleBoxImage_Style: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: Scale(15),
	},
	viewFlexCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tabTitle: {
		color: '#000',
		fontSize: Scale(15),
		fontWeight: 'bold',
		marginBottom: 10,
	},
	bottomLine: {
		height: Scale(2),
		width: '100%',
		marginTop: Scale(5),
	},

  // list styles
  post_container:{
    flex:1,
    height:Scale(240),
    maxWidth:responsiveScreenWidth(100)/3,
    borderWidth:1,
    borderColor:'#D0D0D0',
    borderRightWidth:0,
    borderTopWidth:2,
  },
  post_image:{
    height:Scale(240),
  },
  emptyList: {
	flex:1,
	justifyContent: "center",
	alignItems: "center",
	marginVertical:"15%",
  }
});
