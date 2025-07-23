import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import messaging from '@react-native-firebase/messaging';

const FireBaseMessage = () => {

    useEffect(() => {
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('Received background message in Chat', remoteMessage);
            // Handle the notification here
        });

        messaging().onMessage(async (remoteMessage) => {
            console.log('Received foreground message in Chat', remoteMessage);
            // Handle the notification here
        });
    }, []);

    return (
        <View>
            <Text>Check Message</Text>
        </View>
    )
}
export default FireBaseMessage