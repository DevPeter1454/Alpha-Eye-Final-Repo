import 'package:alpha_eye/core/cores.dart';
import 'package:alpha_eye/presentation/views/features/gemini/chat_page.dart';
import 'package:flutter/material.dart';

class AskGeminiHome extends StatefulWidget {
  const AskGeminiHome({super.key});

  @override
  State<AskGeminiHome> createState() => _AskGeminiHomeState();
}

class _AskGeminiHomeState extends State<AskGeminiHome> {
  final question = [
    {
      'question': 'What is Cataract?',
      'answer':
          'Cataracts are cloudy areas in the lens of the eye. Your scan detected a mild cataract.'
    },
    {
      'question': 'What are the symptoms of cataracts?',
      'answer':
          'The symptoms of cataracts can develop gradually over time and may vary from person to person'
    },
    {
      'question': 'How are cataracts diagnosed?',
      'answer':
          'Cataracts are diagnosed by a comprehensive eye exam performed by an ophthalmologist (a doctor who specializes in eye care)'
    },
    {
      'question': 'How are cataracts treated?',
      'answer':
          'The only effective treatment for cataracts is surgery. During cataract surgery, the cloudy lens of the eye is removed and replaced ...'
    },
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xFFFBFBFB),
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
              Image.asset(AppAssets.geminiPng, width: 150, height: 150),
              Expanded(
                child: GridView.builder(
                  shrinkWrap: true,
                  //padding: EdgeInsets.all(8),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                    //childAspectRatio: 1.5,
                  ),
                  itemCount: 4,
                  itemBuilder: (context, index) {
                    return GestureDetector(
                      onTap: () => navigationService.push(
                        GeminiChatPage(
                          message: question[index]['question']!,
                        ),
                      ),
                      child: Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            AppText(
                              question[index]['question']!,
                              fontWeight: FontWeight.w500,
                              color: AppColors.primary,
                              fontSize: 18,
                            ),
                            const SizedBox(height: 8),
                            AppText(
                              question[index]['answer']!,
                              color: Colors.black54,
                            ),
                          ],
                        ),
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
