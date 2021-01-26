package com.example.carousel.vendor

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.R
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.*
import kotlinx.android.synthetic.main.fragment_vendor_orders.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [VendorOrdersFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class VendorOrdersFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }

        activity?.runOnUiThread {
            val orders = ArrayList<VendorOrder>()

            val apiCallerGetAllOrders: ApiCaller<ResponseVendorAllOrders> = ApiCaller(activity)
            apiCallerGetAllOrders.Caller = ApiClient.getClient.getVendorOrders()
            apiCallerGetAllOrders.Success = { it ->
                if (it != null) {

                    for (data in it.data) {
                        val apiCallerGetCustomer: ApiCaller<ResponseCustomerMe> =
                            ApiCaller(activity)
                        apiCallerGetCustomer.Caller =
                            ApiClient.getClient.getCustomer(data.customerID)
                        apiCallerGetCustomer.Success = { customer ->

                            for (order in data.orderData) {

                                val apiCallerGetProduct: ApiCaller<ResponseProduct> =
                                    ApiCaller(activity)
                                apiCallerGetProduct.Caller =
                                    ApiClient.getClient.getProduct(order.productId)
                                apiCallerGetProduct.Success = { product ->
                                    val apiCallerGetMainProduct: ApiCaller<ResponseMainProduct> =
                                        ApiCaller(activity)
                                    apiCallerGetMainProduct.Caller =
                                        ApiClient.getClient.getMainProduct(product!!.data.parentProduct)
                                    apiCallerGetMainProduct.Success = { mainProduct ->

                                        orders.add(responseToOrder(order, data, customer!!, product, mainProduct))
                                        if (orderList != null)
                                            createOrderList(orders, orderList)

                                    }
                                    apiCallerGetMainProduct.Failure = {
                                        Log.d("product", "fail")
                                    }
                                    apiCallerGetMainProduct.run()
                                    if (orderList != null)
                                        createOrderList(orders, orderList)

                                }
                                apiCallerGetProduct.Failure = {
                                    Log.d("product", "fail")
                                }
                                apiCallerGetProduct.run()
                            }
                        }
                        apiCallerGetCustomer.Failure = {
                            Log.d("customer", "fail")
                        }
                        apiCallerGetCustomer.run()
                    }
                }
            }
            apiCallerGetAllOrders.Failure = {
                Log.d("orders", "fail")
            }
            apiCallerGetAllOrders.run()
        }
    }

    private fun createOrderList(orders: ArrayList<VendorOrder>, orderView: RecyclerView) {
        val adapter = VendorOrderAdapter(orders, requireActivity())
        orderView.apply {
            layoutManager =
                LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(adapter)
        }
        adapter.onItemClick = { order ->
            val intent = Intent(this.context, VendorOrderActivity::class.java)
            intent.putExtra("order", order)
            startActivity(intent)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_vendor_orders, container, false)
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment VendorOrdersFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            VendorOrdersFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}