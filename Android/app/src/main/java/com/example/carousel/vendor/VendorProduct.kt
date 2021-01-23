package com.example.carousel.vendor

import com.example.carousel.Comment
import com.example.carousel.Product

import com.example.carousel.pojo.*
import java.io.Serializable
import java.util.*
import kotlin.collections.ArrayList

data class VendorProduct(
    val _id: String = "",
    val id: Int = 0,
    val vendorId: String = "",
    val companyName: String = "Unknown",
    val title: String,
    val description: String = "",
    val amountLeft: Int = 0,
    val price: Double = 0.0,
    val maxPrice: Int = 0,
    val minPrice: Int = 0,
    val rating: Double = 3.0,
    val numberOfRatings: Int = 0,
    val photoUrl: Int = 0,
    val tags: ArrayList<String> = ArrayList<String>() ,
    val brand: String = "",
    val shipmentPrice: Double = 0.0,
    val soldAmount: Int = 0,
    val releaseDate: Date = Date(),
    val cargoCompany: String = "",
    val category: String = "",
    val photos: ArrayList<String> = ArrayList<String>(),
    val vendorSpecifics: ArrayList<VendorSpecifics> = ArrayList<VendorSpecifics>(),
    val mainProductId: String = ""
) : Serializable


fun responseToProduct (product: VendorProductData, main: MainProductData): VendorProduct {
    return VendorProduct(
        _id = product._id,
        vendorId = product.vendorSpecifics.vendorID ,
        title = main.title,
        description = main.description.toString(),
        price = product.vendorSpecifics.price,
        amountLeft = product.vendorSpecifics.amountLeft,
        shipmentPrice = product.vendorSpecifics.shipmentPrice,
        cargoCompany = product.vendorSpecifics.cargoCompany,
        rating = main.rating,
        photos = product.photos,
        tags = product.tags,
        mainProductId = main._id,

        )
}

