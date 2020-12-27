package com.example.carousel

import java.io.Serializable
import java.util.*
import kotlin.collections.ArrayList

data class Category(
    val id: String,
    val title: String,
    //val photoUrl: String,
    val photoUrl: Int, //temporarily
    ) : Serializable
