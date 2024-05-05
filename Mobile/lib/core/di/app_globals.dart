import 'package:flutter/material.dart';

import '../../data/data.dart';
import '../cores.dart';

class AppGlobals extends ChangeNotifier {
  static AppGlobals instance = AppGlobals._();
  AppGlobals._();

  String? _token;
  User? _user;
  String? _notificationToken;

  Future<void> init() async {
    _token = authLocalStorage.getToken();
    _user = appLocalStorage.getUser();
  }

  ///TODO: Remove this
  String get userType => user?.role ?? UserType.buyer;

  set token(String? value) {
    _token = value;
    notifyListeners();
  }

  set user(User? value) {
    _user = value;
    notifyListeners();
  }

  set notificationToken(String? value) {
    _notificationToken = value;
    notifyListeners();
  }

  String? get token => _token;
  User? get user => _user;
  String? get notificationToken => _notificationToken;
}
