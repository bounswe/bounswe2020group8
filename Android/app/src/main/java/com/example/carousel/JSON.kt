package com.example.carousel

import com.google.gson.annotations.SerializedName

data class ForgotPasswordJSON(
    @SerializedName("returnCode") val returnCode: Int,
    @SerializedName("returnMessage") val returnMessage: String,
)

data class LoginWithPasswordJSON(
    @SerializedName("tokenCode") val tokenCode: String,
    @SerializedName("returnCode") val returnCode: Int,
    @SerializedName("returnMessage") val returnMessage: String,
    @SerializedName("client") val client: ClientJSON
)

data class SignInWithGoogleJSON(
    @SerializedName("tokenCode") val tokenCode: String,
    @SerializedName("client") val client: ClientJSON
)

data class ClientJSON(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("lastName") val lastName: String,
    @SerializedName("email") val email: String,
    @SerializedName("type") val type: String,
)