import React from "react";

// Customizable Area Start
import {
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Video from 'react-native-video';

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import Chat9Controller, {
    Props,
} from "./Chat9Controller";
import { cross } from "./assets";

export default class ImageScreen extends Chat9Controller {
    focusLisner: any
    constructor(props: Props) {
        super(props);
    }

    // Customizable Area Start
    async componentDidMount() {        
        let imageUrl = this?.props?.route?.params?.imageUrl
        this.setState({ userChatImage: imageUrl, vidLoading: true });
    }

    // Customizable Area End


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
                <TouchableOpacity testID="onPressBack" style={{
                    alignSelf: 'flex-end', padding: 10
                }} onPress={() => this.props.navigation.goBack()}>
                    <Image source={cross} style={{
                        height: 30, width: 30, tintColor: 'white'
                    }} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {this.props?.route?.params?.vidUrl == undefined ? <Image resizeMode="contain" source={{ uri: this.state.userChatImage }} style={{ height: "100%", width: Dimensions.get('screen').width }} /> :
                        <>
                          <Video
                                source={{ uri: this.props?.route?.params?.vidUrl }}
                                controls={true}
                                paused={false}
                                resizeMode="cover"
                                onLoad={() => this.setState({ vidLoading: false })}
                                poster="https://media.istockphoto.com/id/472605657/video/play-button-blue.jpg?s=640x640&k=20&c=JCyZi7XOAEwiGmpM5tTZshDwLIQidiHnCQX5wIYHnc0="
                                style={{ height: '100%', width: '100%', marginBottom: 10 }}
                            />
                            <ActivityIndicator style={{bottom:20}} animating={this.state.vidLoading} color="white" />
                        </>
                    }
                </View>
            </SafeAreaView>
        )
    }
}

// Customizable Area Start
const styles = StyleSheet.create({

});
// Customizable Area End
