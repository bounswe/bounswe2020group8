package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import android.widget.LinearLayout
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.map.SearchQuery
import com.example.carousel.pojo.ResponseGetCategories
import com.example.carousel.pojo.ResponseProductSearch
import com.example.carousel.pojo.ResponseProductSearchFilters
import kotlinx.android.synthetic.main.fragment_search.*
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull


class SearchFragment : Fragment() {
    private var lastQuery = ""
    private var lastSort = ""
    private lateinit var spinnerAdapter: ArrayAdapter<String>

    // boolean variable that is used to store if sort spinner is initialized
    private var initializedView = false

    private var queryMinPrice = ""
    private var queryMaxPrice = ""
    private var queryRating = ""
    private var queryColor = ""
    private var queryBrand = ""
    private var querySize = ""
    private var queryCategory = ""
    private var queryVendors = ""

    // mapping from strings, that are shown to user, to the corresponding field of the Product object
    private val sortOptionsMap = mapOf<String, String>("Lowest Price" to "minPrice", "Highest Price" to "-minPrice", "Best Rating" to "-rating",
        "Most commented" to "-numberOfRatings", "Newest" to "releaseDate")

    // mapping from name of rating views to actual numbers
    private val ratingFilterMap = mapOf<String, Int>("one_star" to 1, "two_stars" to 2, "three_stars" to 3,
        "four_stars" to 4, "five_stars" to 5)


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        // all categories are fetched and placed under Category title
        placeCategories()

        initSortSpinner()

        initFilterButton()

        initClearButton()

        initApplyButton()

        initSearchView()

        // hide the image which is to be shown when there is no search result
        noResultImage.visibility = View.INVISIBLE

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_search, container, false)
    }

    private fun initClearButton() {
        clear_button.setOnClickListener{
            // clear query variables
            clearFilters()

            // clear price
            min_price.setText("")
            max_price.setText("")

            // clear rating
            rating_radio_group.clearCheck()

            // clear any color selection
            for(i in 0..(color_container.childCount-1)) {
                val view = color_container.getChildAt(i) as CheckBox
                view.isChecked = false
            }

            // clear any brand selection
            for(i in 0..(brand_container.childCount-1)) {
                val view = brand_container.getChildAt(i) as CheckBox
                view.isChecked = false
            }

            // clear any size selection
            for(i in 0..(size_container.childCount-1)) {
                val view = size_container.getChildAt(i) as CheckBox
                view.isChecked = false
            }

            // clear any category selection
            for(i in 0..(category_container.childCount-1)) {
                val view = category_container.getChildAt(i) as CheckBox
                view.isChecked = false
            }

            // search again (with no filter)
            searchCall()

        }
    }

    // clears filter variables that are used while calling search endpoint
    private fun clearFilters() {
        queryMinPrice = ""
        queryMaxPrice = ""
        queryRating = ""
        queryColor = ""
        queryBrand = ""
        querySize = ""
        queryCategory = ""
        queryVendors = ""
    }

    // sorting options are shown in a spinner
    private fun initSortSpinner() {

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

        // querySort variable should be set according to the element user clicks
        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, pos: Int, id: Long) {
                if (initializedView ==  false)
                {
                    // view is uninitialized
                    // give time to it
                    initializedView = true;
                }
                else {
                    val str = context?.resources!!.getStringArray(R.array.sort_options).get(pos)    // get the element that is clicked
                    lastSort = sortOptionsMap[str].toString()                                       // find the corresponding Product field
                    searchCall()                                                                    // search again with this sorting
                }
            }

        }
    }



    private fun initFilterButton() {

        // click on filter button opens a right drawer
        filterButton.setOnClickListener {
            drawer_layout.openDrawer(Gravity.RIGHT);
        }

        // all tabs are closed at first
        expandable_price.visibility = View.GONE
        expandable_rating.visibility = View.GONE
        color_container.visibility = View.GONE
        size_container.visibility = View.GONE
        brand_container.visibility = View.GONE
        category_container.visibility = View.GONE

        // on click on these titles, tabs should alternate (expand/collapse)
        initPriceFilter()
        initRatingFilter()
        initColorFilter()
        initSizeFilter()
        initBrandFilter()
        initCategoryFilter()
    }

    private fun initCategoryFilter() {
        category_filter.setOnClickListener {
            if(category_container.visibility == View.GONE) {
                category_container.visibility = View.VISIBLE
            }
            else {
                category_container.visibility = View.GONE

            }
        }
    }

    private fun initBrandFilter() {
        brand_filter.setOnClickListener {
            if(brand_container.visibility == View.GONE) {
                brand_container.visibility = View.VISIBLE
            }
            else {
                brand_container.visibility = View.GONE

            }
        }
    }

    private fun initSizeFilter() {
        size_filter.setOnClickListener {
            if(size_container.visibility == View.GONE) {
                size_container.visibility = View.VISIBLE
            }
            else {
                size_container.visibility = View.GONE

            }
        }
    }

    private fun initColorFilter() {
        color_filter.setOnClickListener {
            if(color_container.visibility == View.GONE) {
                color_container.visibility = View.VISIBLE
            }
            else {
                color_container.visibility = View.GONE

            }
        }
    }

    private fun initRatingFilter() {
        rating_filter.setOnClickListener {
            if (expandable_rating.visibility == View.GONE) {
                expandable_rating.visibility = View.VISIBLE
            } else {
                expandable_rating.visibility = View.GONE

            }
        }
    }

    private fun initPriceFilter() {
        price_filter.setOnClickListener {
            if(expandable_price.visibility == View.GONE) {
                expandable_price.visibility = View.VISIBLE
            }
            else {
                expandable_price.visibility = View.GONE

            }
        }
        // when user clicks on a button in this tab, the price range on the button appears in the edittexts
        button_0_50.setOnClickListener {
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
    }

    private fun initApplyButton() {
        // on click to apply button in filter drawer, filters that user checked should be collected
        apply_button.setOnClickListener {
            determineQueryMinPrice()
            determineQueryMaxPrice()
            determineQueryRating()
            determineQueryColor()
            determineQueryBrand()
            determineQuerySize()
            determineQueryCategory()

            // search again with new filters
            searchCall()

        }
    }

    private fun determineQueryCategory() {

        // form of queryCategory is "category=category1,category2,..."

        var category_first = true
        queryCategory = ""
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
    }

    private fun determineQuerySize() {

        // form of querySize is "size=size1,size2,..."

        var size_first = true
        querySize = ""
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
    }

    private fun determineQueryBrand() {

        // form of queryBrand is "brand=brand1,brand2,..."

        var brand_first = true
        queryBrand = ""
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
    }

    private fun determineQueryColor() {

        // form of queryColor is "color=color1,color2,..."

        var color_first = true
        queryColor = ""
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
    }

    private fun determineQueryRating() {

        // an example of queryRating: "rating[gte]=3"

        queryRating = ""
        if(rating_radio_group.getCheckedRadioButtonId() != -1) {
            val selectedId = rating_radio_group.getCheckedRadioButtonId()
            val selectedRadioButton = resources.getResourceEntryName(selectedId)
            Log.d("RADIO",selectedRadioButton)
            val r = ratingFilterMap[selectedRadioButton.toString()]
            Log.d("RADIO TO STR",selectedRadioButton.toString())
            queryRating = "rating[gte]=" + r

        }
    }

    private fun determineQueryMaxPrice() {

        // an example of queryMaxPrice: "minPrice[lte]=300"

        if(max_price.text.toString() != "") {
            queryMaxPrice = "minPrice[lte]=" + max_price.text.toString()
        }
        else {
            queryMaxPrice = ""
        }
    }

    private fun determineQueryMinPrice() {

        // an example of queryMinPrice: "minPrice[gte]=50"

        if(min_price.text.toString() != "") {
            queryMinPrice = "minPrice[gte]=" + min_price.text.toString()
        }
        else {
            queryMinPrice = ""
        }
    }

    private fun initSearchView() {
        search_view.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String): Boolean {
                if(query != "") {
                    // set the query to lastQuery to use it until the next query
                    lastQuery = query
                }
                // search the query
                searchCall()
                // retrieve the filters to this query
                searchFiltersCall()
                return true
            }
            override fun onQueryTextChange(newText: String): Boolean {
                return false
            }
        })
    }

    private fun searchCall(limit: Int = 1000, page: Int = 1, fields: String = "", category: String = "", vendors: String = "") {

        val apiCallerProductSearch: ApiCaller<ResponseProductSearch> = ApiCaller(activity)

        // search endpoint requires strings like "minPrice[gte]=100"
        // handling by this way is naive but straightforward
        var resultUrl = "http://54.165.207.44:8080/product/search?"
        resultUrl += queryBrand + "&" + category + "&" + vendors + "&" + queryMaxPrice + "&" + queryMinPrice
        resultUrl += "&" + queryRating + "&" + queryColor + "&" + querySize + "&" + queryCategory

        val url =
            resultUrl.toHttpUrlOrNull()

        // add bearer token to header if user is authenticated (necessary for customer recommendations)
        var tokenWithSchemaValue = ""
        if (ApplicationContext.instance.isUserAuthenticated()) {
            tokenWithSchemaValue = "Bearer " + ApplicationContext.instance.user?.token
        }
        apiCallerProductSearch.Caller = ApiClient.getClient.productSearch(url, SearchQuery(lastQuery), lastSort, authHeader = tokenWithSchemaValue)
        apiCallerProductSearch.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
                    // get products
                    val products = ArrayList<Product>()
                    for(item in it.data) {
                        products.add(responseToProductSearch(item, item.mainProduct[0]))
                    }

                    // check if any result is found
                    if(products.isEmpty()) {
                        // if no result found, show noResultImage
                        noResultImage.visibility = View.VISIBLE
                    }
                    else {
                        // otherwise hide it
                        noResultImage.visibility = View.INVISIBLE
                    }
                    // shows products on recycler view with id "results"
                    createProductList(products, results)
                })
            }
        }
        apiCallerProductSearch.Failure = {}
        apiCallerProductSearch.run()

    }

    // gets the filters for search query and places them to UI
    private fun searchFiltersCall() {
        val apiCallerProductSearchFilters: ApiCaller<ResponseProductSearchFilters> = ApiCaller(activity)
        apiCallerProductSearchFilters.Caller = ApiClient.getClient.productSearchFilters(SearchQuery(lastQuery))
        apiCallerProductSearchFilters.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here

                    color_container.removeAllViews()
                    brand_container.removeAllViews()
                    size_container.removeAllViews()
                    if(it.data != null) {
                        // add CheckBoxes to brand container, if any brand is retrieved as a filter
                        for (brand in it.data.brands) {
                            val newItem = CheckBox(requireContext())
                            newItem.text = brand
                            newItem.layoutParams = LinearLayout.LayoutParams(
                                LinearLayout.LayoutParams.MATCH_PARENT,
                                LinearLayout.LayoutParams.WRAP_CONTENT
                            )
                            brand_container.addView(newItem)
                        }

                        // same procedure done for brand
                        // param can be either color or size
                        // one for loop for both
                        for (param in it.data.parameters) {
                            var myContainer: LinearLayout
                            if (param.name == "color") {
                                myContainer = color_container
                            } else {
                                myContainer = size_container
                            }
                            for (v in param.value) {
                                val newItem = CheckBox(requireContext())
                                newItem.text = v
                                newItem.layoutParams = LinearLayout.LayoutParams(
                                    LinearLayout.LayoutParams.MATCH_PARENT,
                                    LinearLayout.LayoutParams.WRAP_CONTENT
                                )
                                myContainer.addView((newItem))
                            }
                        }
                    }
                })
            }
        }
        apiCallerProductSearchFilters.Failure = {}
        apiCallerProductSearchFilters.run()

    }

    // productList: array of products to be shown
    // recyclerId: id of the RecyclerView to whom we will add the products
    // creates adapter out of the given product list and assign this adapter to the given recycler view
    private fun createProductList(products: ArrayList<Product>, recyclerId: RecyclerView){
        val adapter = ProductsAdapter(products, requireActivity())
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

    // get categories and place them to UI
    private fun placeCategories() {
        val apiCallerGetCategories: ApiCaller<ResponseGetCategories> = ApiCaller(activity)
        apiCallerGetCategories.Caller = ApiClient.getClient.getCategories()
        apiCallerGetCategories.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
                    for (item in it.data) {
                        if (item.name != "") {

                            // create a CheckBox
                            val newItem = CheckBox(requireContext())

                            // set its text to the category name
                            newItem.text = item.name
                            newItem.layoutParams = LinearLayout.LayoutParams(
                                LinearLayout.LayoutParams.MATCH_PARENT,
                                LinearLayout.LayoutParams.WRAP_CONTENT
                            )
                            // add to the container
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