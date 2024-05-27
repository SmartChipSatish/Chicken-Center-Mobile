import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

// Initialize push notifications and create a notification channel
PushNotification.configure({
  onNotification: function (notification) {
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'default-channel-id',
    channelName: 'Default Channel',
    channelDescription: 'A default channel',
    playSound: false,
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

const usePushNotification = () => {
  const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } else if (Platform.OS === 'android') {
      // Request Android permission (For API level 33+, for 32 or below is not required)
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  const getFCMToken = async () => {
    const oldFcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(oldFcmToken, 'old fcm')
    if (!oldFcmToken) {
      try {
        const newFcmToken = await messaging().getToken();
        console.log(newFcmToken, 'new fcm')
        if (newFcmToken) {
          await AsyncStorage.setItem('fcmToken', newFcmToken);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const listenToForegroundNotifications = async () => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log(
        'A new message arrived! (FOREGROUND)',
        JSON.stringify(remoteMessage),
      );

      // Display the notification in the foreground with image
      PushNotification.localNotification({
        channelId: 'default-channel-id',
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body || '',
        vibrate: true,
        bigText: remoteMessage.notification?.body || '',
        largeIconUrl: remoteMessage.notification?.android?.imageUrl || remoteMessage.notification?.imageUrl,
        bigPictureUrl: remoteMessage.notification?.android?.imageUrl || remoteMessage.notification?.imageUrl,
      });
    });
    return unsubscribe;
  };

  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async (remoteMessage: any) => {
        console.log(
          'A new message arrived! (BACKGROUND)',
          JSON.stringify(remoteMessage),
        );

        // Display the notification in the background with image
        PushNotification.localNotification({
          channelId: 'default-channel-id',
          title: remoteMessage.notification?.title,
          message: remoteMessage.notification?.body || '',
          bigText: remoteMessage.notification?.body || '',
          largeIconUrl: remoteMessage.notification?.android?.imageUrl || remoteMessage.notification?.imageUrl,
          bigPictureUrl: remoteMessage.notification?.android?.imageUrl || remoteMessage.notification?.imageUrl,
        });
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromBackground = async () => {
    const unsubscribe = messaging().onNotificationOpenedApp(
      async (remoteMessage: any) => {
        console.log(
          'App opened from BACKGROUND by tapping notification:',
          JSON.stringify(remoteMessage),
        );
      },
    );
    return unsubscribe;
  };

  const onNotificationOpenedAppFromQuit = async () => {
    const message = await messaging().getInitialNotification();

    if (message) {
      console.log('App opened from QUIT by tapping notification:', JSON.stringify(message));
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    listenToForegroundNotifications,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  };
};

export default usePushNotification;
