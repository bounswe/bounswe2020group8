package com.example.carousel.pojo

import com.example.carousel.Address
import com.example.carousel.Card
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

data class ResponseVendorMe(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("data") val data: DataVendorMe
)


data class ResponseError(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int
)

data class DataCustomerMe(
    @Expose @SerializedName("_id") var id: String,
    @Expose @SerializedName("name")var name: String,
    @Expose @SerializedName("lastName")var lastName: String,
    @Expose @SerializedName("email")var email: String,
    @Expose @SerializedName("isSuspended")var isSuspended: Boolean,
    @Expose @SerializedName("isActive")var isActive: Boolean,
    @Expose @SerializedName("shoppingLists")var shoppingLists: List<List<Product>>?,
    @Expose @SerializedName("orders")var orders: List<ExampleObject>?,
    @Expose @SerializedName("shoppingCart")var cart: List<ExampleObject>?,
    @Expose @SerializedName("addresses")var addresses: List<Address>?,
    @Expose @SerializedName("phoneNumber")var telephoneNumber: String?,
    @Expose @SerializedName("birthday")var birthday: String?,
    @Expose @SerializedName("creditCards")var creditCards: List<Card>?
)
//data class DataCustomerMe(
//    @Expose @SerializedName("_id") val id: String,
//    @Expose @SerializedName("name")val name: String,
//    @Expose @SerializedName("lastName")val lastName: String,
//    @Expose @SerializedName("email")val email: String,
//    @Expose @SerializedName("isSuspended")val isSuspended: Boolean,
//    @Expose @SerializedName("isActive")val isActive: Boolean,
//    @Expose @SerializedName("shoppingLists")val shoppingLists: List<ExampleObject>?,
//    @Expose @SerializedName("shoppingCart")val cart: List<ExampleObject>?,
//    @Expose @SerializedName("addresses")val addresses: List<ExampleObject>?,
//    @Expose @SerializedName("phoneNumber")val telephoneNumber: String?,
//    @Expose @SerializedName("birthday")val birthday: String?,
//    @Expose @SerializedName("creditCards")val creditCards: List<ExampleObject>?
//)

data class DataVendorMe(
    @Expose @SerializedName("id") val id: String,
    @Expose @SerializedName("name")val name: String,
    @Expose @SerializedName("lastName")val lastName: String,
    @Expose @SerializedName("email")val email: String,
    @Expose @SerializedName("isSuspended")val isSuspended: Boolean,
    @Expose @SerializedName("isActive")val isActive: Boolean,
    @Expose @SerializedName("companyName")val shoppingLists: List<ExampleObject>,
    @Expose @SerializedName("companyDomainName")val cart: List<ExampleObject>,
    @Expose @SerializedName("aboutCompany")val addresses: List<ExampleObject>,
    @Expose @SerializedName("IBAN")val telephoneNumber: String,
    @Expose @SerializedName("address")val birthday: String,
    @Expose @SerializedName("location")val creditCards: List<ExampleObject>
)

data class ExampleObject(
    @Expose @SerializedName("id") val id: String,
)

data class ResponseChangePassword(
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String
)