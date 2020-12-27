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

data class SignUpWithPasswordJSON(
    @SerializedName("returnCode") val returnCode: Int,
    @SerializedName("returnMessage") val returnMessage: String,
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

data class AddressJSON(
    @SerializedName("addressName") val address: String,
    @SerializedName("name") val name: String,
    @SerializedName("addressLine") val addressLine: String,
    @SerializedName("city") val city: String,
    @SerializedName("state") val state: String,
    @SerializedName("zipCode") val zipCode: String,
    @SerializedName("phone") val phone: String,

    )

data class CreditCardJSON(
    @SerializedName("creditCardNumber") val creditCardNumber: String,
    @SerializedName("creditCardCvc") val creditCardCvc: String,
    @SerializedName("creditCardData") val creditCardData: String,
    @SerializedName("creditCardName") val creditCardName: String,

    )