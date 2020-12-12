package com.example.carousel.pojo

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class RequestLogin(
    @Expose @SerializedName("email") val email: String,
    @Expose @SerializedName("password") val password: String,
)

data class RequestCustomerSignup(
    @Expose @SerializedName("name") val name: String,
    @Expose @SerializedName("lastName") val lastName: String,
    @Expose @SerializedName("email") val email: String,
    @Expose @SerializedName("password") val password: String,
    @Expose @SerializedName("passwordConfirm") val passwordConfirm: String,
)

