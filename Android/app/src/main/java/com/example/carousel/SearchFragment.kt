package com.example.carousel

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.SearchView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.map.SearchQuery
import com.example.carousel.pojo.ResponseProductSearch
import kotlinx.android.synthetic.main.fragment_search.*


class SearchFragment : Fragment() {
    //private val baseUrl = "http://54.165.207.44:8080"
    private var lastQuery = "fashion"   // a default query
    private lateinit var spinnerAdapter: ArrayAdapter<String>
    private var
            initializedView = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        var sort = ""

        val spinner = sort_spinner
        ArrayAdapter.createFromResource(
            requireContext(),
            R.array.sort_options,
            android.R.layout.simple_spinner_item
        )
            .also { adapter ->
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                // Apply the adapter to the spinner
                spinner.adapter = adapter
                spinnerAdapter = spinner.adapter as ArrayAdapter<String>
            }
        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, pos: Int, id: Long) {
                if (initializedView ==  false)
                {
                    initializedView = true;
                }
                else {
                    sort = context?.resources!!.getStringArray(R.array.sort_options).get(pos)
                    searchCall(lastQuery, sort)
                }
            }

        }

        filterButton.setOnClickListener {
            drawer_layout.openDrawer(Gravity.RIGHT);
            //searchFiltersCall() TODO
        }
        expandable_price.visibility = View.GONE
        expandable_rating.visibility = View.GONE
        expandable_color.visibility = View.GONE


        price_filter.setOnClickListener {
            if(expandable_price.visibility == View.GONE) {
                expandable_price.visibility = View.VISIBLE
            }
            else {
                expandable_price.visibility = View.GONE

            }
        }

        rating_filter.setOnClickListener {
            if(expandable_rating.visibility == View.GONE) {
                expandable_rating.visibility = View.VISIBLE
            }
            else {
                expandable_rating.visibility = View.GONE

            }
        }

        color_filter.setOnClickListener {
            if(expandable_color.visibility == View.GONE) {
                expandable_color.visibility = View.VISIBLE
            }
            else {
                expandable_color.visibility = View.GONE

            }
        }



        // ok button will be removed soon
        /*price_ok.setOnClickListener {
            val minp = min_price.getText()
            val maxp = max_price.getText()
        }*/
        button_0_50.setOnClickListener {
            //button_0_50.setBackgroundColor(Color.parseColor("#FF1FEAD7"))
            min_price.setText("0")
            max_price.setText("50")
        }
        button_50_100.setOnClickListener {
            min_price.setText("50")
            max_price.setText("100")
        }
        button_100_250.setOnClickListener {
            min_price.setText("100")
            max_price.setText("250")
        }
        button_250_500.setOnClickListener {
            min_price.setText("250")
            max_price.setText("500")
        }
        button_500_plus.setOnClickListener {
            min_price.setText("500")
            max_price.setText("")
        }


        //val products = ArrayList<Product>()
        //val adapter = ProductsAdapter(products)
        search_view.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String): Boolean {
                if(query != "") {
                    lastQuery = query
                }
                searchCall(query, sort)
                return true
            }
            override fun onQueryTextChange(newText: String): Boolean {
                return false
            }
        })
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_search, container, false)
    }

    private fun searchCall(query: String, sort: String) {

        val apiCallerProductSearch: ApiCaller<ResponseProductSearch> = ApiCaller(activity)
        //apiCallerLogin.Button = login_button

        apiCallerProductSearch.Caller = ApiClient.getClient.productSearch(SearchQuery(query), sort)
        apiCallerProductSearch.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
                    Toast.makeText(
                        activity, it.data[0].mainProduct[0].title as String?,
                        Toast.LENGTH_LONG
                    ).show()
                    val products = ArrayList<Product>()
                    for(item in it.data) {
                        products.add(responseToProductSearch(item, item.mainProduct[0]))
                    }
                    createProductList(products, results)
                    print("PRODUCTS")
                    print(products)
                })
            }
        }
        apiCallerProductSearch.Failure = {}
        try {
            apiCallerProductSearch.run()
        }
        catch (exc: IllegalStateException) {

        }

        /*val resultingProducts = ArrayList<Product>()
        resultingProducts.add(Product(title = "Macbook Pro 16 inch", price = 999.99, id = 1, photoUrl = R.drawable.image1))
        resultingProducts.add(Product(title = "PlayStation 4 Pro 1TB", price = 399.99, id = 2, photoUrl = R.drawable.image2))
        resultingProducts.add(Product(title = "Samsung Galaxy Tab S6 Lite 10.4", price = 249.9, id = 3, photoUrl = R.drawable.image3))

        resultingProducts.add(Product(title = "Bose Noise Cancelling Wireless Bluetooth Headphones 700", price = 339.99, id = 4, photoUrl = R.drawable.image4))
        resultingProducts.add(Product(title = "Sony X800H 43 Inch TV", price = 448.99, id = 5, photoUrl = R.drawable.image5))
        resultingProducts.add(Product(title = "ASUS F512DA-EB51 VivoBook 15", price = 14.99, id = 6, photoUrl = R.drawable.image6))
        resultingProducts.add(Product(title = "DualSense Wireless Controller \$69.99", price = 69.99, id = 7, photoUrl = R.drawable.image7))

        resultingProducts.add(Product(title = "SAMSUNG 870 QVO SATA III 2.5\\' SSD", price = 199.99, id = 8, photoUrl = R.drawable.image8))

        createProductList(resultingProducts, results)*/

    }

    private fun createProductList(products: ArrayList<Product>, recyclerId: RecyclerView){
        val adapter = ProductsAdapter(products)
        recyclerId.apply {
            layoutManager = GridLayoutManager(this.context, 2)
            setAdapter(adapter)
        }
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
            intent.putExtra("product",product)
            startActivity(intent)
        }
    }

}
