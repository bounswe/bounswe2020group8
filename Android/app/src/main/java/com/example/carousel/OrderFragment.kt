package com.example.carousel

import android.content.Context
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ID
import com.example.carousel.pojo.PurchaseBody
import com.example.carousel.pojo.ResponseLogin
import com.google.android.material.textfield.TextInputLayout
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.android.synthetic.main.fragment_order.*
import kotlinx.android.synthetic.main.fragment_shopping_list.*

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [OrderFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class OrderFragment : Fragment() {
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

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_order, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val addressList = ArrayList<String>()
        val creditCardList = ArrayList<String>()

        if(LoginActivity.isInit()) {
            val addresses = LoginActivity.user.addresses
            val creditCards = LoginActivity.user.creditCards

            if (addresses != null) {
                for (item in addresses) {
                    addressList.add(item.address)
                }
            }
            if (creditCards != null) {
                for(item in creditCards){
                    val displayNumber = item.creditCardNumber.replace("^\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d".toRegex(),"**** **** **** ")
                    creditCardList.add(displayNumber)
                }
            }

            purchase_button.setOnClickListener{
                purchase()
            }
        }
        val addressAdapter = ArrayAdapter(requireContext(), R.layout.shopping_list_names, addressList.toTypedArray())
        (view.findViewById<TextInputLayout>(R.id.address_menu).editText as? AutoCompleteTextView)?.setAdapter(addressAdapter)


        val cardsAdapter = ArrayAdapter(requireContext(), R.layout.shopping_list_names, creditCardList.toTypedArray())
        (view.findViewById<TextInputLayout>(R.id.cards_menu).editText as? AutoCompleteTextView)?.setAdapter(cardsAdapter)

        val adapter = OrderAdapter(CartFragment.ShoppingCart.cart)
        products.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(adapter)
        }
        products_overview.text="Products Overview(${CartFragment.cart.size})"
        total_cost.text = "\$${String.format("%.2f",CartFragment.totalCost())}"

    }

    fun purchase() {
        val apiCallerPurchase: ApiCaller<ID> = ApiCaller(activity)
        apiCallerPurchase.Button = purchase_button
        for(product in CartFragment.cart) {
            apiCallerPurchase.Caller = ApiClient.getClient.purchaseRequest(PurchaseBody(LoginActivity.user.id, LoginActivity.user.addresses?.get(0)!!._id,
                LoginActivity.user.addresses?.get(0)!!._id, LoginActivity.user.creditCards?.get(0)!!._id))
            apiCallerPurchase.Success = { it ->
                if (it != null) {
                    Toast.makeText(requireContext(),"Order Received!", android.widget.Toast.LENGTH_SHORT).show()
                }
            }
            apiCallerPurchase.Failure = {}
            apiCallerPurchase.run()
        }
    }
    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment OrderFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            OrderFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}