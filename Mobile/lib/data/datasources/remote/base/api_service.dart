import 'package:dio/dio.dart';
import 'package:alpha_eye/data/datasources/remote/base/api_failure.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';

import '../../../../core/cores.dart';
import 'endpoints.dart';
import 'logging_interceptor.dart';

class ApiService {
  ApiService({required this.path});
  CookieJar cookieJar = CookieJar();

  final String path;

  Dio get _dio => Dio(
        BaseOptions(
          headers: {
            "Authorization":
                appGlobals.token == null ? null : 'Bearer ${appGlobals.token}',
          },
          baseUrl: Endpoints.baseUrl + path,
          contentType: Headers.jsonContentType,
          responseType: ResponseType.json,
        ),
      )
        ..interceptors.add(LoggingInterceptor())
        ..interceptors.add(CookieManager(cookieJar));

  Future<dynamic> get(String path, {Map<String, dynamic>? queryParams}) async {
    try {
      final res = await _dio.get(path, queryParameters: queryParams);
      return res.data;
    } on DioException catch (e) {
      throw ApiFailure(_handleError(e));
    }
  }

  Future<dynamic> delete(String path) async {
    try {
      final res = await _dio.delete(path);
      return res.data;
    } on DioException catch (e) {
      throw ApiFailure(_handleError(e));
    }
  }

  Future<dynamic> post(String path, {Object? data}) async {
    try {
      final res = await _dio.post(path, data: data);
      return res.data;
    } on DioException catch (e) {
      throw ApiFailure(_handleError(e));
    }
  }

  Future<dynamic> formData(String path, {Object? data}) async {
    try {
      final res = await _dio.post(
        path,
        data: data,
        options: Options(
          contentType: Headers.multipartFormDataContentType,
        ),
      );
      return res.data;
    } on DioException catch (e) {
      throw ApiFailure(_handleError(e));
    }
  }

  Future<dynamic> patch(String path, {Object? data}) async {
    try {
      final res = await _dio.patch(path, data: data);
      return res.data;
    } on DioException catch (e) {
      throw ApiFailure(_handleError(e));
    }
  }

  String _handleError(DioError dioError) {
    String errorDescription = "";
    //if (error is DioError) {
    //DioError dioError = error as DioError;

    switch (dioError.type) {
      case DioErrorType.cancel:
        errorDescription = "Request to server was cancelled";
        break;
      case DioErrorType.connectionTimeout:
        errorDescription = "Connection timeout. Please try again!";
        break;
      case DioErrorType.unknown:
        errorDescription = "Something went wrong";
        break;
      case DioErrorType.receiveTimeout:
        errorDescription = "Receive timeout in connection with server";
        break;
      case DioErrorType.sendTimeout:
        errorDescription = "Send timeout in connection with server";
        break;
      case DioErrorType.connectionError:
        errorDescription = "Connection to server failed due to internet";
        break;
      case DioErrorType.badCertificate:
        errorDescription = "Bad certificate";
        break;
      case DioErrorType.badResponse:
        errorDescription = "Bad response";
        if (dioError.response?.data['detail'] != null) {
          errorDescription = dioError.response?.data['detail'];
        }

        if (dioError.response?.data['detail'] != null) {
          errorDescription = dioError.response?.data['detail'];
        }
        break;
    }

    return errorDescription;
  }
}
