package com.example.carousel.pojo

import com.example.carousel.*
import com.example.carousel.Address
import com.example.carousel.Card
import com.example.carousel.Product
import com.example.carousel.vendor.Location
import com.google.gson.JsonObject
import com.google.gson.annotations.Expose
import com.google.gson.annotations.SerializedName
import java.io.Serializable
import java.util.*
import kotlin.collections.ArrayList

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

data class ResponseCustomerMe2(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("data") val data: DataCustomerMe2
)

data class RequestProductAmountUpdate(
    @Expose @SerializedName("vendorID") val vendorID: String,
    @Expose @SerializedName("price") val price: Double,
    @Expose @SerializedName("amountLeft") val amountLeft: Int,
    @Expose @SerializedName("shipmentPrice") val shipmentPrice: Double,
    @Expose @SerializedName("cargoCompany") val cargoCompany: String
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

data class RequestSetStatus(
    @Expose @SerializedName("mainOrderID") var mainOrderID: String,
    @Expose @SerializedName("orderID") var orderID: String,
    @Expose @SerializedName("status") var status: String,
)

data class DataCustomerMe(
    @Expose @SerializedName("_id") var id: String,
    @Expose @SerializedName("name")var name: String,
    @Expose @SerializedName("lastName")var lastName: String,
    @Expose @SerializedName("email")var email: String,
    @Expose @SerializedName("isSuspended")var isSuspended: Boolean,
    @Expose @SerializedName("isActive")var isActive: Boolean,
    //@Expose @SerializedName("shoppingLists")var shoppingLists: List<List<Product>>?,
    @Expose @SerializedName("orders")var orders: List<ExampleObject>?,
    @Expose @SerializedName("shoppingCart")var cart: List<ExampleObject>?,
    @Expose @SerializedName("addresses")var addresses: ArrayList<AddressJSON>?,
    @Expose @SerializedName("phoneNumber")var telephoneNumber: String?,
    @Expose @SerializedName("birthday")var birthday: String?,
    @Expose @SerializedName("creditCards")var creditCards:  ArrayList<CreditCardJSON>?
)

data class DataCustomerMe2(
    @Expose @SerializedName("_id") var id: String,
    @Expose @SerializedName("name")var name: String,
    @Expose @SerializedName("lastName")var lastName: String,
    @Expose @SerializedName("email")var email: String,
    @Expose @SerializedName("isSuspended")var isSuspended: Boolean,
    @Expose @SerializedName("isActive")var isActive: Boolean,
    @Expose @SerializedName("shoppingLists")var shoppingLists: List<List<Product>>?,
    @Expose @SerializedName("orders")var orders: List<ExampleObject>?,
    @Expose @SerializedName("shoppingCart")var cart: List<ExampleObject>?,
    @Expose @SerializedName("addresses")var addresses: List<Address>,
    @Expose @SerializedName("phoneNumber")var telephoneNumber: String?,
    @Expose @SerializedName("birthday")var birthday: String?,
    @Expose @SerializedName("creditCards")var creditCards:  List<Card>?
)


data class DataVendorMe(
    @Expose @SerializedName("_id") val id: String,
    @Expose @SerializedName("name")val name: String?,
    @Expose @SerializedName("lastName")val lastName: String?,
    @Expose @SerializedName("email")val email: String,
    @Expose @SerializedName("isSuspended")val isSuspended: Boolean,
    @Expose @SerializedName("isActive")val isActive: Boolean,
    @Expose @SerializedName("companyName")val companyName: String?,
    @Expose @SerializedName("companyDomainName")val companyDomainName: String?,
    @Expose @SerializedName("aboutCompany")val aboutCompany: String?,
    @Expose @SerializedName("IBAN")val IBAN: String?,
    @Expose @SerializedName("address")var address: Address?,
    @Expose @SerializedName("locations")val locations: ArrayList<Location>?,
)


data class ResponseVendorAllOrders(
    @Expose @SerializedName("data") val data: ArrayList<VendorAllOrdersData>,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String
)

data class VendorAllOrdersData(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("customerID") val customerID: String,
    @Expose @SerializedName("orders") val orderData: ArrayList<VendorOrderData>,
)

data class VendorOrderData(

    @Expose @SerializedName("_id") val id: String,
    @Expose @SerializedName("productId") val productId: String,
    @Expose @SerializedName("vendorId") val vendorId: String,
    @Expose @SerializedName("amount") val amount: Int,
    @Expose @SerializedName("price") val price: Double,
    @Expose @SerializedName("shipmentPrice") val shipmentPrice: Int,
    @Expose @SerializedName("cargoCompany") val cargoCompany: String,
    @Expose @SerializedName("shippingAddress") val shippingAddress: Address,
    @Expose @SerializedName("billingAddress") val billingAddress: Address,
    @Expose @SerializedName("creditCard") val creditCard: CreditCard,
    @Expose @SerializedName("status") val status: String,
)

data class CreditCard(
    @Expose @SerializedName("creditCardNumber") val creditCardNumber: String,
    @Expose @SerializedName("creditCardCvc") val creditCardCvc: String,
    @Expose @SerializedName("creditCardData") val creditCardData: String,
    @Expose @SerializedName("creditCardName") val creditCardName: String,
)

data class ExampleObject(
    @Expose @SerializedName("id") val id: String,
)

data class ResponseChangePassword(
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String
)


data class ResponseMainProduct(
    @Expose @SerializedName("data") val data: MainProductData,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String
) : Serializable

data class ResponseProduct(
    @Expose @SerializedName("data") val data: ProductData,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String
) : Serializable

data class ResponseAllProducts(
    @Expose @SerializedName("results") val results: Int,
    @Expose @SerializedName("data") val data: ArrayList<AllProductData>,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String
) : Serializable

data class VendorResponseAllProducts(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("results") val results: Int,
    @Expose @SerializedName("data") val data: ArrayList<VendorProductData>
)

data class VendorProductData(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("tags") val tags: ArrayList<String>,
    @Expose @SerializedName("parameters") val parameters: ArrayList<Parameter>,
    @Expose @SerializedName("vendorSpecifics") val vendorSpecifics: VendorMeSpecifics,
    @Expose @SerializedName("photos") val photos: ArrayList<String>,
    @Expose @SerializedName("parentProduct") val parentProduct: String,
    @Expose @SerializedName("brand") val brand: String,
    @Expose @SerializedName("category") val category: String,

)

data class ProductData(
    @Expose @SerializedName("default") val default: VendorDefaults,
    @Expose @SerializedName("tags") val tags: ArrayList<String>,
    @Expose @SerializedName("photos") val photos: ArrayList<String>,
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("parameters") val parameters: ArrayList<Parameter>,
    @Expose @SerializedName("vendorSpecifics") val vendorSpecifics: ArrayList<VendorDefaults>,
    @Expose @SerializedName("parentProduct") val parentProduct: String,
    @Expose @SerializedName("brand") val brand: String,
    @Expose @SerializedName("category") val category: String,
    @Expose @SerializedName("createdAt") val createdAt: Date,
    @Expose @SerializedName("updatedAt") val updatedAt: Date,
) : Serializable

data class AllProductData(
    @Expose @SerializedName("default") val default: VendorDefaults,
    @Expose @SerializedName("tags") val tags: ArrayList<String>,
    @Expose @SerializedName("photos") val photos: ArrayList<String>,
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("parameters") val parameters: ArrayList<Parameter>,
    @Expose @SerializedName("vendorSpecifics") val vendorSpecifics: ArrayList<VendorSpecifics>,
    @Expose @SerializedName("parentProduct") val parentProduct: String,
    @Expose @SerializedName("brand") val brand: String,
    @Expose @SerializedName("category") val category: String,
    @Expose @SerializedName("createdAt") val createdAt: Date,
    @Expose @SerializedName("updatedAt") val updatedAt: Date,
) : Serializable

data class MainProductData(
    @Expose @SerializedName("tags") val tags: List<String>,
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("title") val title: String,
    @Expose @SerializedName("parameters") val parameters: List<Parameters>,
    @Expose @SerializedName("description") val description: String? = "",
    @Expose @SerializedName("rating") val rating: Double,
    @Expose @SerializedName("numberOfRating") val numberOfRating: Int,
    @Expose @SerializedName("brand") val brand: String,
    @Expose @SerializedName("soldAmount") val soldAmount: Int,
    @Expose @SerializedName("category") val category: String,
    @Expose @SerializedName("isConfirmed") val isConfirmed: Boolean,
    @Expose @SerializedName("createdAt") val createdAt: Date,
    @Expose @SerializedName("updatedAt") val updatedAt: Date,
) : Serializable

data class Parameters(
    @Expose @SerializedName("values") val value: ArrayList<String>,
    @Expose @SerializedName("name") val name: String
) : Serializable

data class Parameter(
    @Expose @SerializedName("value") val value: String,
    @Expose @SerializedName("name") val name: String
) : Serializable


data class VendorDefaults(
    @Expose @SerializedName("vendorID") val vendorID: String,
    @Expose @SerializedName("price") val price: Double,
    @Expose @SerializedName("amountLeft") val amountLeft: Int,
    @Expose @SerializedName("shipmentPrice") val shipmentPrice: Double,
    @Expose @SerializedName("cargoCompany") val cargoCompany: String
) : Serializable

data class VendorMeSpecifics(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("price") val price: Double,
    @Expose @SerializedName("amountLeft") val amountLeft: Int,
    @Expose @SerializedName("shipmentPrice") val shipmentPrice: Double,
    @Expose @SerializedName("cargoCompany") val cargoCompany: String,
    @Expose @SerializedName("vendorID") val vendorID: String
)


data class VendorSpecifics(
    @Expose @SerializedName("vendorID") val vendorID: VendorID?,
    @Expose @SerializedName("price") val price: Double,
    @Expose @SerializedName("amountLeft") val amountLeft: Int,
    @Expose @SerializedName("shipmentPrice") val shipmentPrice: Double,
    @Expose @SerializedName("cargoCompany") val cargoCompany: String
) : Serializable

data class VendorID(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("companyName") val companyName: String
) : Serializable


data class ResponseGetCategories(
    @Expose @SerializedName("returnMessage") val returnMessage: String,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("results") val results: Int,
    @Expose @SerializedName("data") val data: List<Category>
)

data class Category(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("name") val name: String
)

data class ResponseGetComments(
    @Expose @SerializedName("data") val data: ArrayList<Comment>
)

data class PostComment(
    @Expose @SerializedName("text") val text: String,
    @Expose @SerializedName("rate") val rate: Int
)

data class ResponseCart(
    @Expose @SerializedName("data") val data: ArrayList<DataCart>,
    )
data class DataCart(
    @Expose @SerializedName("productId") val productId: String,
    @Expose @SerializedName("vendorId") val vendorId: String,
    @Expose @SerializedName("amount") val amount: Int,
    @Expose @SerializedName("price") val price: Double,
    @Expose @SerializedName("shipmentPrice") val shipmentPrice: Double,
    @Expose @SerializedName("cargoCompany") val cargoCompany: String,
    @Expose @SerializedName("title") val title: String,
    @Expose @SerializedName("vendorName") val vendorName: String,
    @Expose @SerializedName("photos") val photos: ArrayList<String>,
)

data class UpdateCart(
    @Expose @SerializedName("amount") val amount: Int,
    @Expose @SerializedName("productId") val productId: String,
    @Expose @SerializedName("vendorId") val vendorId: String,
)

data class DeleteCart(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("productId") val productId: String,
    @Expose @SerializedName("vendorId") val vendorId: String,
)

data class ResetCart(
    @Expose @SerializedName("_id") val _id: String,
)

data class ID(
    @Expose @SerializedName("_id") val _id: String,
)

data class ResponseProductSearch(
    @Expose @SerializedName("results") val results: Int,
    @Expose @SerializedName("data") val data: List<DataProductSearch>,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String,
)

data class DataProductSearch(
    @Expose @SerializedName("matches") val matches: Int,
    @Expose @SerializedName("maxPrice") val maxPrice: Double,
    @Expose @SerializedName("minPrice") val minPrice: Double,
    @Expose @SerializedName("vendors") val vendors: List<VendorID>,
    @Expose @SerializedName("mainProduct") val mainProduct: ArrayList<MainProduct>,
    @Expose @SerializedName("product") val product: ProductDataSearch,
    @Expose @SerializedName("mpid") val mpid: String,
    @Expose @SerializedName("brand") val brand: String,
    @Expose @SerializedName("category") val category: String,
)

data class ProductDataSearch(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("photos") val photos: ArrayList<String>,
)

data class MainProduct(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("title") val title: String,
    @Expose @SerializedName("rating") val rating: Double,
    @Expose @SerializedName("numberOfRating") val numberOfRating: Int,
)

data class ResponseProductSearchFilters(
    @Expose @SerializedName("data") val data: DataProductSearchFilters,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String,
)

data class ResponseVendorMeProduct(
    @Expose @SerializedName("data") val data: DataProductSearchFilters,
    @Expose @SerializedName("returnCode") val returnCode: Int,
    @Expose @SerializedName("returnMessage") val returnMessage: String,
)

data class DataProductSearchFilters(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("parameters") val parameters: List<Parameters>,
    @Expose @SerializedName("maxPrice") val maxPrice: Double,
    @Expose @SerializedName("minPrice") val minPrice: Double,
    @Expose @SerializedName("vendors") val vendors: List<VendorID>,
    @Expose @SerializedName("brands") val brands: List<String>,
    @Expose @SerializedName("categories") val categories: List<String>,

    )

data class PurchaseBody(
    @Expose @SerializedName("shippingAddressId") val shippingAddressId: String,
    @Expose @SerializedName("billingAddressId") val billingAddressId: String,
    @Expose @SerializedName("creditCardId") val creditCardId: String,
    )

data class PostTicket(
    @Expose @SerializedName("message") val message: String,
    @Expose @SerializedName("topic") val topic: String,
) : Serializable

data class ResponseTicket(
    @Expose @SerializedName("data") val data: DataTicket,
) : Serializable

data class ResponseAllTickets(
    @Expose @SerializedName("data") val data: ArrayList<DataTicket>,
) : Serializable

data class DataTicket(
    @Expose @SerializedName("_id") val _id: String,
    @Expose @SerializedName("topic") val topic: String,
    @Expose @SerializedName("adminId") val adminId: String,
    @Expose @SerializedName("clientId") val clientId: String,
    @Expose @SerializedName("isActive") val isActive: Boolean,
    @Expose @SerializedName("isAssigned") val isAssigned: Boolean,
    @Expose @SerializedName("startedAt") val startedAt: Date,
    @Expose @SerializedName("updatedAt") val updatedAt: Date,
    @Expose @SerializedName("conversation") val conversation: ArrayList<DataConversation>,
    ): Serializable

data class DataConversation(
    @Expose @SerializedName("payload") val payload: String,
    @Expose @SerializedName("isSentByAdmin") val isSentByAdmin: Boolean,
    @Expose @SerializedName("sendAt") val sendAt: Date,
): Serializable

data class ReplyTicket(
    @Expose @SerializedName("payload") val payload: String,
) : Serializable