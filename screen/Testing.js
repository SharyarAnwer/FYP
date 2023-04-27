import { View, Text, TouchableOpacity } from 'react-native'
import React , {useEffect} from 'react'
import PushNotification from "react-native-push-notification";

export default function Testing() {

    const createChannel = () => {
        PushNotification.createChannel(
            {
                channelId : "test-channel",
                channelName : "test channel"
            }
        )
    }

    useEffect(() => {
      createChannel()
    }, [])
    
    const handleNotification = (name , message) => {

        //PushNotification.cancelAllLocalNotifications()

        PushNotification.localNotification({
            channelId : "test-channel",
            title : "You clicked to notify",
            message : "This is the message",
            color : "red"
        })

        PushNotification.localNotificationSchedule({
            channelId : "test-channel",
            title : "Alarm",
            message : "THIS IS A SCHEDULED NOTIFICATION",
            date : new Date(Date.now() + 2 * 1000),
            allowWhileIdle : true,
            color : "red"
        })
    }
  return (
    <View>
      <Text>Testing</Text>

      <TouchableOpacity onPress={(name , message) => {

        setTimeout(() => {
            handleNotification()
        }, 1000);
      }}>
        <Text>Press This Button Once More</Text>
      </TouchableOpacity>
    </View>
  )
}