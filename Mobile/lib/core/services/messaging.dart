import 'dart:developer';

import 'package:alpha_eye/core/constants/colors.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:overlay_support/overlay_support.dart';

class Messaging {
  static void setupInteractedMessage() {
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      //navigationService.push(const TransactionHistoryScreen());
    });
  }

  static void registerNotification() {
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      log("Received a message in the foreground!");
      log("Message data: ${message.data}");

      if (message.notification != null) {
        showSimpleNotification(
          Text(message.notification?.title ?? ""),
          subtitle: Text(message.notification?.body ?? ""),
          background: AppColors.primary.withOpacity(0.9),
          foreground: Colors.white,
          slideDismissDirection: DismissDirection.startToEnd,
          duration: const Duration(seconds: 5),
        );
        log("Notification body: ${message.notification?.body}");
        log("Notification title: ${message.notification?.title}");
      }
    });

    FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);
  }

  static void checkForInitialMessage() async {
    await Firebase.initializeApp();
    RemoteMessage? initialMessage =
        await FirebaseMessaging.instance.getInitialMessage();

    if (initialMessage != null) {
      showSimpleNotification(
        Text(initialMessage.notification?.title ?? ""),
        subtitle: Text(initialMessage.notification?.body ?? ""),
        background: AppColors.primary.withOpacity(0.9),
        foreground: Colors.white,
        slideDismissDirection: DismissDirection.startToEnd,
        duration: const Duration(seconds: 5),
      );
      log("Notification body: ${initialMessage.notification?.body}");
      log("Notification title: ${initialMessage.notification?.title}");
    }
  }

  static Future<void> _firebaseMessagingBackgroundHandler(
      RemoteMessage message) async {
    await Firebase.initializeApp();
    log("Handling a background message: ${message.messageId}");
  }
}
