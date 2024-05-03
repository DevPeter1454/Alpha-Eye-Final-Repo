import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:alpha_eye/presentation/views/auth/intro/intro_screen.dart';

import '../../../core/cores.dart';
import '../features/home/bottom_nav.dart';

class AppNav extends HookWidget {
  const AppNav({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final isAuthenticated = appGlobals.token != null;
    if (isAuthenticated) {
      return const BottomNavHome();
    } else {
      return const IntroScreen();
    }
  }
}
