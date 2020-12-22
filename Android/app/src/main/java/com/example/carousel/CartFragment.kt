package com.example.carousel

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.application.ApplicationContext
import kotlinx.android.synthetic.main.fragment_acount_page.view.*
import kotlinx.android.synthetic.main.fragment_cart.*
import kotlinx.android.synthetic.main.fragment_cart.view.*
import kotlinx.android.synthetic.main.fragment_shopping_list.*
import kotlinx.android.synthetic.main.fragment_shopping_list.view.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [CartFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class CartFragment : Fragment() {

    private lateinit var adapter: CartAdapter
    private var totalCost = 0.0
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        if(cart.isEmpty()) {
            addToCart(
                Product(
                    title = "Introducing Fire TV Stick Lite with Alexa Voice Remote Lite",
                    price = 18.99,
                    id = 9,
                    photoUrl = R.drawable.image9
                )
            )
            addToCart(
                Product(
                    title = "To Kill a Mockingbird 14.99",
                    price = 14.99,
                    id = 10,
                    photoUrl = R.drawable.image10
                )
            )
            addToCart(
                Product(
                    title = "Arlo VMC2030-100NAS Essential Spotlight Camera",
                    price = 99.99,
                    id = 11,
                    photoUrl = R.drawable.image11
                )
            )
        }
        adapter = CartAdapter(cart)
        products_in_cart.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(this@CartFragment.adapter)
        }
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
            intent.putExtra("product", product)
            startActivityForResult(intent,11)
        }
        updateTotalCost(adapter.totalCost())
        val observer = object : RecyclerView.AdapterDataObserver(){
            override fun onChanged() {
                super.onChanged()
                updateTotalCost(adapter.totalCost())
            }
        }
        adapter.registerAdapterDataObserver(observer)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (ApplicationContext.instance.isUserAuthenticated())
            cart_view.visibility = View.VISIBLE
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_cart, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        if (!ApplicationContext.instance.isUserAuthenticated()) {
            val intent = Intent(activity, LoginActivity::class.java)
            startActivity(intent)
        }
        else {
            view.cart_view.visibility = View.VISIBLE
        }
    }
    private fun updateTotalCost(newCost: Double){
        totalCost = newCost
        total_cost.text = "\$${String.format("%.2f",totalCost)}"
    }
    companion object ShoppingCart {
        var cart = ArrayList<Product>()

        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            ShoppingListFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }


        fun addToCart(product: Product) {
            cart.add(product)
        }

        fun removeFromCart(productIndex: Int) {
            if (cart.isNotEmpty())
                cart.removeAt(productIndex)
        }
    }

}