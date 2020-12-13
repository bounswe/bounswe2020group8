package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.fragment_home.*


// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [HomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class HomeFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }

    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        val productsDeals = ArrayList<Product>()
        //val productsDeals = ArrayList<Product>()
        productsDeals.add(Product(title = "Macbook Pro 16 inch", price = 999.99, id = 1, photoUrl = R.drawable.image1,
        description = "Ninth-generation 6-Core Intel Core i7 Processor\n" +
                "Stunning 16-inch Retina Display with True Tone technology\n" +
                "Touch Bar and Touch ID\n" +
                "AMD Radeon Pro 5300M Graphics with GDDR6 memory\n" +
                "Ultrafast SSD\n" +
                "Intel UHD Graphics 630\n" +
                "Six-speaker system with force-cancelling woofers\n" +
                "Four Thunderbolt 3 (USB-C) ports\n" +
                "Up to 11 hours of battery life\n" +
                "802.11AC Wi-Fi"))
        productsDeals.add(Product(title = "PlayStation 4 Pro 1TB", price = 399.99, id = 2, photoUrl = R.drawable.image2))
        productsDeals.add(Product(title = "Samsung Galaxy Tab S6 Lite 10.4", price = 249.9, id = 3, photoUrl = R.drawable.image3))
        productsDeals.add(Product(title = "Bose Noise Cancelling Wireless Bluetooth Headphones 700", price = 339.99, id = 4, photoUrl = R.drawable.image4))
        createProductList(productsDeals, deals)

        val productsNew = ArrayList<Product>()
        productsNew.add(Product(title = "Sony X800H 43 Inch TV", price = 448.99, id = 5, photoUrl = R.drawable.image5))
        productsNew.add(Product(title = "ASUS F512DA-EB51 VivoBook 15", price = 14.99, id = 6, photoUrl = R.drawable.image6))
        productsNew.add(Product(title = "DualSense Wireless Controller \$69.99", price = 69.99, id = 7, photoUrl = R.drawable.image7))
        productsNew.add(Product(title = "SAMSUNG 870 QVO SATA III 2.5\\' SSD", price = 199.99, id = 8, photoUrl = R.drawable.image8))
        createProductList(productsNew, newProducts)

        val productsTop = ArrayList<Product>()
        productsTop.add(Product(title = "Introducing Fire TV Stick Lite with Alexa Voice Remote Lite", price = 18.99, id = 9, photoUrl = R.drawable.image9))
        productsTop.add(Product(title = "To Kill a Mockingbird 14.99", price = 14.99, id = 10, photoUrl = R.drawable.image10))
        productsTop.add(Product(title = "Arlo VMC2030-100NAS Essential Spotlight Camera", price = 99.99, id = 11, photoUrl = R.drawable.image11))
        productsTop.add(Product(title = "Compact Wireless Smart Speaker", price = 180.99, id = 12, photoUrl = R.drawable.image12))
        createProductList(productsTop, topSellers)

    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home, container, false)
    }
    private fun createProductList(products: ArrayList<Product>, productCategory: RecyclerView ){
        val adapter = ProductsAdapter(products)
        productCategory.apply {
            layoutManager = LinearLayoutManager(this.context,LinearLayoutManager.HORIZONTAL, false)
            setAdapter(adapter)
        }
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
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
         * @return A new instance of fragment HomeFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            HomeFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}