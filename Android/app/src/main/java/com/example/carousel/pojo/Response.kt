package com.example.carousel.pojo

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class ResponseLogin(
    @Expose @SerializedName("tokenCode") val tokenCode: String,
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int
)

data class ResponseError(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int
)