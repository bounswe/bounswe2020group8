package com.example.carousel

import android.animation.Animator
import android.animation.ValueAnimator
import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.fragment_acount_page.view.*
import kotlinx.android.synthetic.main.fragment_cart.*
import kotlinx.android.synthetic.main.fragment_cart.view.*
import kotlinx.android.synthetic.main.fragment_shopping_list.*
import kotlinx.android.synthetic.main.fragment_shopping_list.view.*
import android.content.Context
import android.opengl.Visibility
import android.view.animation.DecelerateInterpolator
import com.example.carousel.application.ApplicationContext
import kotlinx.android.synthetic.main.product_cart_view.view.*

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
    private var numOfItems = 0
    private var isCollapsed = false
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
        updateCartInfo(adapter.totalCost(), adapter.itemCount)
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
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
            intent.putExtra("product", product)
            startActivityForResult(intent,11)
        }
        val observer = object : RecyclerView.AdapterDataObserver(){
            override fun onChanged() {
                super.onChanged()
                updateCartInfo(adapter.totalCost(), adapter.itemCount)
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
    private fun updateCartInfo(newCost: Double, newNum: Int){
        totalCost = newCost
        numOfItems = newNum
        total_cost.text = "\$${String.format("%.2f",totalCost)}"
        item_count.text = "Products (${numOfItems})"
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
}