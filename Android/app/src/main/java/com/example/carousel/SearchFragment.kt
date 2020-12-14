package com.example.carousel

import android.app.AlertDialog
import android.content.DialogInterface
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.SearchView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.fragment_search.*

class SearchFragment : Fragment() {
    private val baseUrl = "http://18.198.51.178:8080"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        sortButton.setOnClickListener {
            val builder = AlertDialog.Builder(activity)
            //set title for alert dialog
            builder.setTitle("Sort by")

            val sortOptions = arrayOf("Price (low price first)","Price (high price first)", "Rating", "Most commented", "Newest", "Vendor rating")
            builder.setItems(sortOptions) { dialog, which ->
                when (which) {
                    0 -> { /* horse */
                    }
                    1 -> { /* cow   */
                    }
                    2 -> { /* camel */
                    }
                    3 -> { /* camel */
                    }
                    4 -> { /* camel */
                    }
                }
            }

            // Create the AlertDialog
            val alertDialog: AlertDialog = builder.create()
            // Set other dialog properties
            alertDialog.setCancelable(false)
            alertDialog.show()
        }

        filterButton.setOnClickListener {
            drawer_layout.openDrawer(Gravity.RIGHT);
        }



        //val products = ArrayList<Product>()
        //val adapter = ProductsAdapter(products)
        searchView.setOnQueryTextListener(object : SearchView.OnQueryTextListener {
            override fun onQueryTextSubmit(query: String): Boolean {
                /*if (list.contains(query)) {
                    //adapter.filter.filter(query)
                } else {
                    //Toast.makeText(this@MainActivity, "No Match found", Toast.LENGTH_LONG).show()
                }*/
                searchCall(query)
                return false
            }
            override fun onQueryTextChange(newText: String): Boolean {
                //adapter.filter.filter(newText)
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

    private fun searchCall(query: String) {
        //val intent = Intent(this.context, SearchResultActivity::class.java)
        //startActivity(intent)

        val resultingProducts = ArrayList<Product>()
        //val productsDeals = ArrayList<Product>()
        resultingProducts.add(Product(title = "Macbook Pro 16 inch", price = 999.99, id = 1, photoUrl = R.drawable.image1))
        resultingProducts.add(Product(title = "PlayStation 4 Pro 1TB", price = 399.99, id = 2, photoUrl = R.drawable.image2))
        resultingProducts.add(Product(title = "Samsung Galaxy Tab S6 Lite 10.4", price = 249.9, id = 3, photoUrl = R.drawable.image3))
        resultingProducts.add(Product(title = "Bose Noise Cancelling Wireless Bluetooth Headphones 700", price = 339.99, id = 4, photoUrl = R.drawable.image4))
        createProductList(resultingProducts, results)
    }
    private fun createProductList(products: ArrayList<Product>, recyclerId: RecyclerView){
        val adapter = ProductsAdapter(products)
        recyclerId.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(adapter)
        }
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
            intent.putExtra("id", product.id)
            startActivity(intent)
        }
    }
}
