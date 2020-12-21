package com.example.carousel.pojo

import com.example.carousel.Product
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
    @Expose @SerializedName("id") var id: String,
    @Expose @SerializedName("name")var name: String,
    @Expose @SerializedName("lastName")var lastName: String,
    @Expose @SerializedName("email")var email: String,
    @Expose @SerializedName("isSuspended")var isSuspended: Boolean,
    @Expose @SerializedName("isActive")var isActive: Boolean,
    @Expose @SerializedName("shoppingLists")var shoppingLists: List<List<Product>>,
    @Expose @SerializedName("orders")var orders: List<ExampleObject>,
    @Expose @SerializedName("cart")var cart: List<ExampleObject>,
    @Expose @SerializedName("addresses")var addresses: List<ExampleObject>,
    @Expose @SerializedName("telephoneNumber")var telephoneNumber: String,
    @Expose @SerializedName("birthday")var birthday: String,
    @Expose @SerializedName("creditCards")var creditCards: List<ExampleObject>
)

data class ExampleObject(
    @Expose @SerializedName("id") val id: String,
)

data class ResponseChangePassword(
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String
)