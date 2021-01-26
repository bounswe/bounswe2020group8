package com.example.carousel

import android.animation.Animator
import android.animation.ValueAnimator
import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.fragment_cart.*
import kotlinx.android.synthetic.main.fragment_cart.view.*
import android.view.animation.DecelerateInterpolator
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.*
import kotlinx.android.synthetic.main.fragment_home.*
import java.io.Serializable

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [CartFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class CartFragment : Fragment(){

    private lateinit var adapter: CartAdapter
    private var totalCost = 0.0
    private var numOfItems = 0
    private var isCollapsed = false
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        activity?.runOnUiThread {
            val apiCallerGetCart: ApiCaller<ArrayList<ResponseCart>> = ApiCaller(activity)
            apiCallerGetCart.Caller = ApiClient.getClient.getCart()
            apiCallerGetCart.Success = { it ->
                if (it != null) {
                    for (product in it[0].data) {
                        val newProduct = Product(
                            _id = product.productId,
                            vendorId = product.vendorId,
                            price = product.price,
                            title = product.title,
                            photos = product.photos,
                            shipmentPrice = product.shipmentPrice,
                        )
                        Log.d("PRODUCT:", newProduct.toString())
                        if(!isInCart(newProduct._id))
                        addToCart(newProduct, product.amount)
                    }
                    adapter = CartAdapter(cart, requireActivity())
                    products_in_cart.apply {
                        layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
                        setAdapter(this@CartFragment.adapter)
                    }
                    updateCartInfo(totalCost(), adapter.itemCount)

                    val observer = object : RecyclerView.AdapterDataObserver() {
                        override fun onChanged() {
                            super.onChanged()
                            updateCartInfo(totalCost(), adapter.itemCount)
                        }

                    }
                    adapter.registerAdapterDataObserver(observer)
                }
            }
            apiCallerGetCart.run()
            apiCallerGetCart.Failure = { Log.d("FIRSTRESPONSE", "FAILED") }

        }
/*
        if(cart.isEmpty()) {
            addToCart(
                Product(
                    title = "Introducing Fire TV Stick Lite with Alexa Voice Remote Lite",
                    price = 18.99,
                    _id = "abc",
                    photoUrl = R.drawable.image9
                ), 3
            )
            addToCart(
                Product(
                    title = "To Kill a Mockingbird 14.99",
                    price = 14.99,
                    _id = "122",
                    photoUrl = R.drawable.image10
                ) , 2
            )
            addToCart(
                Product(
                    title = "Arlo VMC2030-100NAS Essential Spotlight Camera",
                    price = 99.99,
                    _id = "as3",
                    photoUrl = R.drawable.image11
                ),2
            )
        }
        */



        product_dropdown.setOnClickListener {
            if(isCollapsed) {
                products_in_cart.animateVisibility(true)
                dropdown_arrow.setImageResource(R.drawable.ic_arrow_drop_down_24px)
                isCollapsed = false
            }
            else {
                products_in_cart.animateVisibility(false)
                dropdown_arrow.setImageResource(R.drawable.ic_arrow_drop_up_24px)

                isCollapsed = true
            }
        }
        purchase_cart_button.setOnClickListener{
            purchase()
        }

        clear_cart.setOnClickListener {
            val apiCallerResetCart: ApiCaller<ArrayList<DataCustomerMe>> = ApiCaller(activity)
            apiCallerResetCart.Caller = ApiClient.getClient.resetCart(ResetCart(LoginActivity.user.id))
            apiCallerResetCart.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread {
                        adapter.reset()
                        adapter.notifyDataSetChanged()
                    }
                }
            }
            apiCallerResetCart.run()
            apiCallerResetCart.Failure = { Log.d("CLEAR", "FAILED") }

        }

        /*
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
            intent.putExtra("product", product)
            startActivity(intent)
        }
        */

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
    private fun updateCartInfo(newCost: Double, newNum: Int){
        totalCost = newCost
        numOfItems = newNum
        total_cost.text = "\$${String.format("%.2f",totalCost)}"
        item_count.text = "Products (${numOfItems})"
    }

    companion object ShoppingCart {
        var cart = ArrayList<Pair<Product, Int>>()
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            ShoppingListFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }

        fun isInCart(productId: String) : Boolean {
            for (item in cart) {
                if (item.first._id == productId) {
                    return true
                }
            }
            return false
        }
        fun addToCart(product: Product, num: Int) {
            for(item in cart){
                if(item.first._id == product._id) {
                    val newPair = item.copy(second = item.second + num)
                    cart[cart.indexOf(item)] = newPair
                    return
                }
            }
            cart.add(Pair(product, num))
        }
        fun updateCart(product: Product, num: Int) {
            for(item in cart){
                if(item.first._id == product._id) {
                    val newPair = item.copy(second = num)
                    cart[cart.indexOf(item)] = newPair
                    return
                }
            }
            cart.add(Pair(product, num))
        }

        fun removeFromCart(productIndex: Int) {
            if (cart.isNotEmpty())
                cart.removeAt(productIndex)
        }
        fun totalCost(): Double{
            var sum : Double = 0.0
            for(product in cart){
                sum+= (product.first.price*product.second)
            }
            return sum
        }
    }
    fun View.animateVisibility(setVisible: Boolean) {
        if (setVisible) expand(this) else collapse(this)
    }

    private fun expand(view: View) {
        view.measure(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        val initialHeight = 0
        val targetHeight = view.measuredHeight

        // Older versions of Android (pre API 21) cancel animations for views with a height of 0.
        //v.getLayoutParams().height = 1;
        view.layoutParams.height = 0
        view.visibility = View.VISIBLE

        animateView(view, initialHeight, targetHeight)
    }

    private fun collapse(view: View) {
        val initialHeight = view.measuredHeight
        val targetHeight = 0

        animateView(view, initialHeight, targetHeight)
    }
    private fun animateView(v: View, initialHeight: Int, targetHeight: Int) {
        val valueAnimator = ValueAnimator.ofInt(initialHeight, targetHeight)
        valueAnimator.addUpdateListener { animation ->
            v.layoutParams.height = animation.animatedValue as Int
            v.requestLayout()
        }
        valueAnimator.addListener(object : Animator.AnimatorListener {
            override fun onAnimationEnd(animation: Animator) {
                v.layoutParams.height = targetHeight
            }

            override fun onAnimationStart(animation: Animator) {}
            override fun onAnimationCancel(animation: Animator) {}
            override fun onAnimationRepeat(animation: Animator) {}
        })
        valueAnimator.duration = 300
        valueAnimator.interpolator = DecelerateInterpolator()
        valueAnimator.start()
    }
    private fun purchase(){
        activity?.supportFragmentManager?.beginTransaction()
            ?.replace(R.id.activity_main_nav_host_fragment, OrderFragment())
            ?.commit()
    }
}