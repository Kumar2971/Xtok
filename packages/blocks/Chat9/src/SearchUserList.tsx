import React from "react";

// Customizable Area Start
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput
} from "react-native";

//@ts-ignore
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End
import { translate } from "../../../components/src/i18n/translate";
import Chat9Controller, {
    Props,
} from "./Chat9Controller";
import { back, profile_pic, search, cross } from "./assets";



export default class SearchUserList extends Chat9Controller {
    constructor(props: Props) {
        super(props);
        // Customizable Area Start

        // Customizable Area End
    }

    // Customizable Area Start
    // Customizable Area End

    renderItem = ({ item }: any) => {
        console.log({item})
        return (
            <View>
                <TouchableOpacity testID="onUserClick" style={styles.continue} onPress={() => this.onUserClick(item)} >
                    <View style={{}}>
                        <Image source={item?.photo !== null ? { uri: item.photo } : profile_pic} style={styles.shadow} />
                    </View>
                    <View style={{ flex: 1, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            {
                                item?.full_name ? <Text style={{ fontWeight: 'bold', left: 20 }}>{item.full_name}</Text> : null
                            }
                            {/* <View style={{ flexDirection: 'row', position: 'absolute', right: 10 }}>
                                <Text style={{ color: 'grey', top: 10 }}>Sunday</Text>
                            </View> */}
                        </View>
                        <View style={styles.bioText}>
                            <Text numberOfLines={1} style={{ color: 'grey' }}>{item?.bio || translate('noBio')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };



    render() {
        // Customizable Area Start
        // Merge Engine - render - Start
        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity testID="backBtn" onPress={() => this.props.navigation.goBack()}>
                            <Image source={back} style={[styles.backImage,this.state.language =='ar' && {
                                transform: [{ rotate: '180deg' }]
                            }]} resizeMode='contain' />
                        </TouchableOpacity>
                        <Text style={styles.directTextStyle}>{translate("search")}</Text>
                        <View />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '90%',
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: 'grey'
                        }}>
                            <Image source={search} style={{ height: 20, width: 20, left: 10, tintColor: 'grey' }} />
                            <TextInput
                                pointerEvents={this.state.loading ? "none" : "auto"}
                                returnKeyType="done"
                                testID="onSearchUser"
                                style={[{ left: 20, width: '70%', height: 45 },this.state.language =='ar' && {
                                    textAlign: 'right'
                                }]}
                                value={this.state.searchText}
                                onChangeText={(searchText) => this.onChangeSearch(searchText)}
                                placeholder={
                                    translate("search")
                                }
                            />
                            {(this.state.searchText?.length > 0) && <TouchableOpacity testID="clearSearch" onPress={()=>{this.onChangeSearch("")}} style={styles.clearIconBgnd}>
                                <Image source={cross} style={styles.clearIcon} />
                            </TouchableOpacity>}
                        </View>
                    </View>
                    <View>
                        {this.state.loading && this.state.searchText !== '' ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 300 }}>
                                <ActivityIndicator color="black" size={30} />
                            </View>
                            :
                            <FlatList
                                data={this.state.searchText != '' ? this.state.matchResult : this.state.followersList}
                                renderItem={this.renderItem}
                                keyExtractor={(item: any) => item.id}
                                showsVerticalScrollIndicator={false}
                            />}
                        {this.state.matchResult.length == 0 && this.state.searchText !== "" && !this.state.loading ? <Text style={styles.emptyMsg}>{translate("no_match_found")}</Text> : null}
                    </View>
                </View>
            </SafeAreaView>
        );
        // Merge Engine - render - End
        // Customizable Area End
    }
}

// Customizable Area Start
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 20
    },
    backImage: {
        height: 20,
        width: 10
    },
    directTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    addImage: {
        height: 25,
        width: 25
    },
    continue: {
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: "white",
        fontWeight: "700",
        fontSize: 20,
        paddingVertical: 15,
    },
    shadow: { height: 40, width: 40, borderRadius: 32, borderColor: 'grey', padding: 5 },
    emptyMsg: {
        alignSelf: 'center',
        marginTop: 10,
    },
    bioText: {
        marginHorizontal: 20,
        flexDirection: 'row',
    },
    clearIconBgnd:{
        left:40,
        padding : 5
    },
    
    clearIcon : { 
        height: 15, 
        width: 15, 
        tintColor: 'grey', 
    },
});
// Customizable Area End
