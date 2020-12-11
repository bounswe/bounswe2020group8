package com.example.carousel.map

import com.example.carousel.pojo.*
import okhttp3.ResponseBody

import retrofit2.Call
import retrofit2.http.*


interface ApiInterface {

    //customer login request
    @POST("/customer/login")
    fun login(@Body request: RequestLogin): Call<ResponseBody>

}