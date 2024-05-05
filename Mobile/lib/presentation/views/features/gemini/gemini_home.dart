import 'package:alpha_eye/core/constants/constants.dart';
import 'package:alpha_eye/core/cores.dart';
import 'package:alpha_eye/presentation/views/features/gemini/chat_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class AskGeminiHome extends StatefulWidget {
  const AskGeminiHome({super.key});

  @override
  State<AskGeminiHome> createState() => _AskGeminiHomeState();
}

class _AskGeminiHomeState extends State<AskGeminiHome> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xFFFBFBFB),
        appBar: AppBar(
          elevation: 0,
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          title: const Text('Ask Gemini'),
          centerTitle: true,
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Column(
            children: [
              Image.asset(AppAssets.geminiPng, width: 200, height: 200),
              Expanded(
                child: GridView.builder(
                  shrinkWrap: true,
                  //padding: EdgeInsets.all(8),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                    //childAspectRatio: 1.5,
                  ),
                  itemCount: 4,
                  itemBuilder: (context, index) {
                    return Container(
                      padding: EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          AppText(
                            'What is Cataract?',
                            fontWeight: FontWeight.w500,
                            color: AppColors.primary,
                            fontSize: 18,
                          ),
                          SizedBox(height: 8),
                          AppText(
                            'Cataracts are cloudy areas in the lens of the eye. Your scan detected a mild cataract.',
                            color: Colors.black54,
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
              Center(
                child: AppButton(
                  onPressed: () {
                    navigationService.push(const GeminiChatPage());
                  },
                  color: AppColors.primary,
                  elevation: 0,
                  width: double.infinity,
                  child: const AppText(
                    'Ask other questions',
                    color: AppColors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              const Spacing.height(
                24.0,
              ),
            ],
          ),
        ));
  }
}
