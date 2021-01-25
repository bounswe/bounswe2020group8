package com.example.carousel

import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName

data class Comment(
    @Expose @SerializedName("mainProductId") val mainProductId: String,
    @Expose @SerializedName("customerId") val customerId: String,
    @Expose @SerializedName("text") val text: String,
    @Expose @SerializedName("rate") val rate: Int = 0,
    @Expose @SerializedName("name") var name: String = "Anonymous",
    @Expose @SerializedName("lastName") var lastName: String = "User",
    )
