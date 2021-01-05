package com.example.carousel

import android.widget.EditText
import java.io.Serializable
import java.util.*
import kotlin.collections.ArrayList

data class Address(
    val addressName: String,
    val name: String?,
    val addressLine: String,
    val city: String,
    val state: String?,
    val zipCode: String,
    val phone: String?
    ) : Serializable
