package com.example.carousel.pojo

import com.google.gson.JsonObject
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class ResponseLogin(
    @Expose @SerializedName("tokenCode") val tokenCode: String,
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int
)

data class ResponseHeader(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int
)

data class ResponseCustomerMe(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("data") val data: DataCustomerMe
)

data class ResponseError(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int
)

data class DataCustomerMe(
    @Expose @SerializedName("id") val id: String,
    @Expose @SerializedName("name")val name: String,
    @Expose @SerializedName("lastName")val lastName: String,
    @Expose @SerializedName("email")val email: String,
    @Expose @SerializedName("isSuspended")val isSuspended: Boolean,
    @Expose @SerializedName("isActive")val isActive: Boolean,
    @Expose @SerializedName("shoppingLists")val shoppingLists: List<ExampleObject>,
    @Expose @SerializedName("orders")val orders: List<ExampleObject>,
    @Expose @SerializedName("cart")val cart: List<ExampleObject>,
    @Expose @SerializedName("addresses")val addresses: List<ExampleObject>,
    @Expose @SerializedName("telephoneNumber")val telephoneNumber: String,
    @Expose @SerializedName("birthday")val birthday: String,
    @Expose @SerializedName("creditCards")val creditCards: List<ExampleObject>
)

data class ExampleObject(
    @Expose @SerializedName("id") val id: String,
)

data class ResponseChangePassword(
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String
)