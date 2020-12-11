package com.example.carousel.map

import okhttp3.*

class HeaderInterceptor: Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response {
        var request = chain.request()
        request = request.newBuilder()
            .addHeader("accept", "application/json")
            .build()
        return chain.proceed(request)
    }
}