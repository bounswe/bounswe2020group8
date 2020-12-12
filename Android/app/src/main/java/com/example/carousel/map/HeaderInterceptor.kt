package com.example.carousel.map

import com.example.carousel.application.ApplicationContext
import okhttp3.*
import java.io.IOException
import kotlin.jvm.Throws

class HeaderInterceptor : Interceptor, Authenticator {

    override fun intercept(chain: Interceptor.Chain): Response {
        var request = chain.request()
        request = request.newBuilder()
            .addHeader("accept", "application/json")
            .build()
        return chain.proceed(request)
    }

    @Throws(IOException::class)
    override fun authenticate(route: Route?, response: Response): Request? {
        var requestAvailable: Request? = response.request
        if (ApplicationContext.instance.isUserAuthenticated()) {
            val tokenWithSchemaValue = "Bearer " + ApplicationContext.instance.user?.token
            try {
                requestAvailable = requestAvailable?.newBuilder()
                    ?.addHeader("Authorization", tokenWithSchemaValue)
                    ?.build()
                return requestAvailable
            } catch (ex: Exception) {
            }
        }
        return requestAvailable
    }
}