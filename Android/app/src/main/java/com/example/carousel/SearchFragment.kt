package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import android.widget.LinearLayout
import android.widget.RadioGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.map.SearchQuery
import com.example.carousel.pojo.ResponseGetCategories
import com.example.carousel.pojo.ResponseProductSearch
import com.example.carousel.pojo.ResponseProductSearchFilters
import kotlinx.android.synthetic.main.activity_product_page.*
import kotlinx.android.synthetic.main.fragment_search.*
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull


class SearchFragment : Fragment() {
    //private val baseUrl = "http://54.165.207.44:8080"
    private var lastQuery = "fashion"   // a default query
    private var lastSort = ""
    private lateinit var spinnerAdapter: ArrayAdapter<String>
    private var initializedView = false
    private var initializedViewFilter = false

    private var queryMinPrice = ""
    private var queryMaxPrice = ""
    private var queryRating = ""
    private var queryColor = ""
    private var queryBrand = ""
    private var querySize = ""
    private var queryCategory = ""
    private var queryVendors = ""

    private val sortOptionsMap = mapOf<String, String>("Lowest Price" to "minPrice", "Highest Price" to "-minPrice", "Best Rating" to "-rating",
        "Most commented" to "-numberOfRatings", "Newest" to "releaseDate")

    private val ratingFilterMap = mapOf<String, Int>("1 star and above" to 1, "2 stars and above" to 2, "3 stars and above" to 3,
        "4 stars and above" to 4, "5 stars" to 5)


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        //placecat()

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
                    val str = context?.resources!!.getStringArray(R.array.sort_options).get(pos)
                    sort = sortOptionsMap[str].toString()
                    lastSort = sort
                    searchCall()
                }
            }

        }

        filterButton.setOnClickListener {
            drawer_layout.openDrawer(Gravity.RIGHT);
        }
        expandable_price.visibility = View.GONE
        expandable_rating.visibility = View.GONE
        color_container.visibility = View.GONE
        size_container.visibility = View.GONE
        brand_container.visibility = View.GONE
        category_container.visibility = View.GONE
        //vendors_container.visibility = View.GONE


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
            if(color_container.visibility == View.GONE) {
                color_container.visibility = View.VISIBLE
            }
            else {
                color_container.visibility = View.GONE

            }
        }
        size_filter.setOnClickListener {
            if(size_container.visibility == View.GONE) {
                size_container.visibility = View.VISIBLE
            }
            else {
                size_container.visibility = View.GONE

            }
        }
        brand_filter.setOnClickListener {
            if(brand_container.visibility == View.GONE) {
                brand_container.visibility = View.VISIBLE
            }
            else {
                brand_container.visibility = View.GONE

            }
        }
        category_filter.setOnClickListener {
            if(category_container.visibility == View.GONE) {
                category_container.visibility = View.VISIBLE
            }
            else {
                category_container.visibility = View.GONE

            }
        }
        /*vendors_filter.setOnClickListener {
            if(vendors_container.visibility == View.GONE) {
                vendors_container.visibility = View.VISIBLE
            }
            else {
                vendors_container.visibility = View.GONE

            }
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

        /*rating_clear.setOnCheckedChangeListener(RadioGroup.OnCheckedChangeListener { group, checkedId ->
            rating_radio_group.clearCheck()
        })*/




        apply_button.setOnClickListener {
            if(min_price.text.toString() != "") {
                queryMinPrice = "minPrice[gte]=" + min_price.text.toString()
            }
            if(max_price.text.toString() != "") {
                queryMaxPrice = "minPrice[lte]=" + min_price.text.toString()
            }
            if(rating_radio_group.getCheckedRadioButtonId() != -1) {
                val selectedId = rating_radio_group.getCheckedRadioButtonId()
                val selectedRadioButton = resources.getResourceEntryName(selectedId)
                val r = ratingFilterMap[selectedRadioButton]
                queryRating = "rating[gte]=" + r

            }
            var color_first = true
            for(i in 0..(color_container.childCount-1)) {
                val view = color_container.getChildAt(i) as CheckBox
                if(view.isChecked) {
                    if(color_first) {
                        queryColor = "color=" + view.text.toString()
                        color_first = false
                    }
                    else {
                        queryColor += "," + view.text.toString()
                    }
                }
            }

            var brand_first = true
            for(i in 0..(brand_container.childCount-1)) {
                val view = brand_container.getChildAt(i) as CheckBox
                if(view.isChecked) {
                    if(brand_first) {
                        queryBrand = "brand=" + view.text.toString()
                        brand_first = false
                    }
                    else {
                        queryBrand += "," + view.text.toString()
                    }
                }
            }

            var size_first = true
            for(i in 0..(size_container.childCount-1)) {
                val view = size_container.getChildAt(i) as CheckBox
                if(view.isChecked) {
                    if(size_first) {
                        querySize = "size=" + view.text.toString()
                        size_first = false
                    }
                    else {
                        querySize += "," + view.text.toString()
                    }
                }
            }

            var category_first = true
            for(i in 0..(category_container.childCount-1)) {
                val view = category_container.getChildAt(i) as CheckBox
                if(view.isChecked) {
                    if(category_first) {
                        queryCategory = "category=" + view.text.toString()
                        category_first = false
                    }
                    else {
                        queryCategory += "," + view.text.toString()
                    }
                }
            }

            /*var vendors_first = true
            for(i in 0..(vendors_container.childCount-1)) {
                val view = vendors_container.getChildAt(i) as CheckBox
                if(view.isChecked) {
                    if(vendors_first) {
                        queryVendors = "vendors=" + view.text.toString()
                        vendors_first = false
                    }
                    else {
                        queryVendors += "," + view.text.toString()
                    }
                }
            }*/

            searchCall()

        }

        search_view.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String): Boolean {
                if(query != "") {
                    lastQuery = query
                }
                searchCall()
                searchFiltersCall()
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

    private fun searchCall(limit: Int = 1000, page: Int = 1, fields: String = "", category: String = "", vendors: String = "") {

        val apiCallerProductSearch: ApiCaller<ResponseProductSearch> = ApiCaller(activity)
        //apiCallerLogin.Button = login_button

        var resultUrl = "http://54.165.207.44:8080/product/search?"
        resultUrl += queryBrand + "&" + category + "&" + vendors + "&" + queryMaxPrice + "&" + queryMinPrice
        resultUrl += "&" + queryRating + "&" + queryColor + "&" + querySize + "&" + queryCategory //+ "&" + queryVendors

        val url =
            resultUrl.toHttpUrlOrNull()

        apiCallerProductSearch.Caller = ApiClient.getClient.productSearch(url, SearchQuery(lastQuery), lastSort)
        apiCallerProductSearch.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
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
        apiCallerProductSearch.run()

    }

    private fun searchFiltersCall() {
        val apiCallerProductSearchFilters: ApiCaller<ResponseProductSearchFilters> = ApiCaller(activity)
        //apiCallerLogin.Button = login_button

        apiCallerProductSearchFilters.Caller = ApiClient.getClient.productSearchFilters(SearchQuery(lastQuery))
        apiCallerProductSearchFilters.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here

                    color_container.removeAllViews()
                    brand_container.removeAllViews()
                    size_container.removeAllViews()

                    for(brand in it.data.brands) {
                        val newItem = CheckBox(requireContext())
                        newItem.text = brand
                        newItem.layoutParams = LinearLayout.LayoutParams(
                            LinearLayout.LayoutParams.MATCH_PARENT,
                            LinearLayout.LayoutParams.WRAP_CONTENT
                        )
                        brand_container.addView(newItem)
                    }

                    for(catg in it.data.categories) {
                        val newItem = CheckBox(requireContext())
                        newItem.text = catg
                        newItem.layoutParams = LinearLayout.LayoutParams(
                            LinearLayout.LayoutParams.MATCH_PARENT,
                            LinearLayout.LayoutParams.WRAP_CONTENT
                        )
                        category_container.addView(newItem)
                    }

                    for(param in it.data.parameters) {
                        var myContainer: LinearLayout
                        if (param.name == "color") {
                            myContainer = color_container
                        }
                        else {
                            myContainer = size_container
                        }
                        for(v in param.value) {
                            val newItem = CheckBox(requireContext())
                            newItem.text = v
                            newItem.layoutParams = LinearLayout.LayoutParams(
                                LinearLayout.LayoutParams.MATCH_PARENT,
                                LinearLayout.LayoutParams.WRAP_CONTENT
                            )
                            myContainer.addView((newItem))
                        }
                    }
                })
            }
        }
        apiCallerProductSearchFilters.Failure = {}
        apiCallerProductSearchFilters.run()

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

    // will be changed after milestone 2 :(
    private fun placecat() {
        val apiCallerGetCategories: ApiCaller<ResponseGetCategories> = ApiCaller(activity)
        //apiCallerLogin.Button = login_button
        apiCallerGetCategories.Caller = ApiClient.getClient.getCategories()
        apiCallerGetCategories.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
                    for (item in it.data) {
                        if (item.name != null) {
                            val newItem = CheckBox(requireContext())
                            newItem.text = item.name
                            newItem.layoutParams = LinearLayout.LayoutParams(
                                LinearLayout.LayoutParams.MATCH_PARENT,
                                LinearLayout.LayoutParams.WRAP_CONTENT
                            )
                            category_container.addView(newItem)
                        }

                    }
                })
            }
        }
        apiCallerGetCategories.Failure = {}
        apiCallerGetCategories.run()
    }

}
