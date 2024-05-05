import 'package:alpha_eye/core/services/messaging.dart';
import 'package:alpha_eye/core/services/notification_service.dart';
import 'package:alpha_eye/firebase_options.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:alpha_eye/data/datasources/local/base/local_storage_service.dart';

import 'app/app.dart';
import 'app/bloc_observer.dart';
import 'core/cores.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  setupLocator();
  await LocalStorageService.init();
  await AppGlobals.instance.init();

  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    // statusBarColor: AppColors.primary.withOpacity(0.4), // status bar color
    // Status bar brightness (optional)
    statusBarIconBrightness: Brightness.dark, // For Android (dark icons)
    statusBarBrightness: Brightness.light,
  ));

  final notificationService = NotificationService();
  //final messaging = Messaging();
  notificationService.requestPermission();
  Messaging.registerNotification();
  Messaging.setupInteractedMessage();
  Messaging.checkForInitialMessage();
  notificationService.getToken();

  Bloc.observer = AppBlocObserver();
  runApp(
    // DevicePreview(
    //   enabled: !kReleaseMode,
    //   builder: (context) => App(), // Wrap your app
    // ),

    const App(),
  );
}
