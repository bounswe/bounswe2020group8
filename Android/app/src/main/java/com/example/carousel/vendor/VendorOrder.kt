package com.example.carousel.vendor

import com.example.carousel.Address
import com.example.carousel.Card
import com.example.carousel.pojo.*
import java.io.Serializable
import java.util.*
import kotlin.collections.ArrayList

data class VendorOrder(
    val _id: String = "",
    val productId: String = "",
    val vendorId: String = "",
    val amount: Int = 0,
    val price: Double = 0.0,
    val shipmentPrice: Int = 0,
    val cargoCompany: String = "",
    val shippingAddress: Address,
    val billingAddress: Address,
    var status: String = "",
    val mainOrderId: String = "",
    val customerId: String = "",
    val customerName: String = "",
    val customerSurname: String = "",
    val productName: String = "",
    val product: ResponseProduct?
) : Serializable


fun responseToOrder(
    order: VendorOrderData,
    main: VendorAllOrdersData,
    customer: ResponseCustomerMe,
    product: ResponseProduct?,
    mainProduct: ResponseMainProduct?
): VendorOrder {
    return VendorOrder(
        _id = order.id,
        productId = order.productId,
        vendorId = order.vendorId,
        amount = order.amount,
        price = order.price,
        shipmentPrice = order.shipmentPrice,
        cargoCompany = order.cargoCompany,
        shippingAddress = order.shippingAddress,
        billingAddress = order.billingAddress,

        status = order.status,
        mainOrderId = main._id,
        customerId = main.customerID,
        customerName = customer.data.name,
        customerSurname = customer.data.lastName,
        product = product,
        productName = mainProduct!!.data.title
    )
}
