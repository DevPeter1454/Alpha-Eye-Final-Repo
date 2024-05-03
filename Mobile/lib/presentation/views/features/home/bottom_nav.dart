import 'package:alpha_eye/presentation/views/features/home/tabs/home.dart';
import 'package:alpha_eye/presentation/views/features/home/tabs/prescription_page.dart';
import 'package:alpha_eye/presentation/views/features/home/tabs/settings.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_svg/svg.dart';

//import 'package:flutter_hooks/flutter_hooks.dart';

import '../../../../core/cores.dart';

class BottomNavHome extends HookWidget {
  const BottomNavHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final tabIndex = useState(0);
    final bottomNavIndex = useState(0);
    List<Widget> children = const [
      HomeView(),
      PrescriptionPage(),
      SettingsView(),
    ];
    return DefaultTabController(
      length: 3,
      initialIndex: tabIndex.value,
      child: Scaffold(
        backgroundColor: AppColors.homeScaffold,
        // appBar: HomeAppBar(),
        body: children[bottomNavIndex.value],

        ///Bottom Navigation Bar for controlling the body or home view.
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          selectedItemColor: AppColors.primary,
          unselectedItemColor: AppColors.sdn600,
          iconSize: 20.0,
          selectedFontSize: 14.0,
          unselectedFontSize: 14.0,
          onTap: (value) => bottomNavIndex.value = value,
          currentIndex: bottomNavIndex.value,
          showUnselectedLabels: true,
          showSelectedLabels: true,
          selectedIconTheme: const IconThemeData(
            color: AppColors.primary,
          ),
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                AppAssets.uiLogo,
                height: 20.0,
                width: 20.0,
                color: bottomNavIndex.value == 1
                    ? AppColors.primary
                    : AppColors.sdn600,
              ),
              label: 'Prescriptions',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_outline),
              label: 'Settings',
            ),
          ],
        ),
      ),
    );
  }
}
