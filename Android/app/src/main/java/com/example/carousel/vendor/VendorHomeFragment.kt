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
import com.example.carousel.*
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseAllProducts
import com.example.carousel.pojo.ResponseMainProduct
import com.example.carousel.pojo.VendorResponseAllProducts
import kotlinx.android.synthetic.main.fragment_vendor_home.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [VendorHomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class VendorHomeFragment : Fragment() {
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
            val productsDeals = ArrayList<VendorProduct>()
            //val apiCallerGetProduct: ApiCaller<ResponseProduct> = ApiCaller(activity)
            //apiCallerGetProduct.Caller = ApiClient.getClient.getProduct("5fe757b3d28edecdb6f1e5ce")
            val apiCallerGetProduct: ApiCaller<VendorResponseAllProducts> = ApiCaller(activity)
            apiCallerGetProduct.Caller = ApiClient.getClient.vendorMeProduct()
            apiCallerGetProduct.Success = { firstResponse ->
                if (firstResponse != null) {
                    activity?.runOnUiThread {
                        Log.d("FIRSTRESPONSE", firstResponse.toString())
                        for(product in firstResponse.data) {
                            val apiCallerGetMainProduct: ApiCaller<ResponseMainProduct> = ApiCaller(activity)
                            apiCallerGetMainProduct.Caller =
                                ApiClient.getClient.getMainProduct(product.parentProduct)
                            apiCallerGetMainProduct.Success = { it ->
                                if (it!= null) {
                                    Log.d("SECONDRESPONSE", it.toString())
                                    productsDeals.add(responseToProduct(product, it.data))
                                    if(deals != null)
                                        createProductList(productsDeals, deals)
                                }
                            }
                            apiCallerGetMainProduct.Failure = { Log.d("SECONDRESPONSE", "FAILED") }
                            apiCallerGetMainProduct.run()
                        }
                    }
                }
            }
            apiCallerGetProduct.Failure = {
                Log.d("FIRSTRESPONSE", "FAILED")}
            apiCallerGetProduct.run()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_vendor_home, container, false)
    }

    private fun createProductList(products: ArrayList<VendorProduct>, productCategory: RecyclerView){
        val adapter = VendorProductsAdapter(products)
        productCategory.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(adapter)
        }
        Log.d("ITEMCOUNT",adapter.itemCount.toString())
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, VendorProductPageActivity::class.java)
            intent.putExtra("product",product)
            startActivity(intent)
        }
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment VendorHomeFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            VendorHomeFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}