package com.example.carousel

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
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
import com.example.carousel.pojo.ResponseCustomerMe
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


    var selectedCard = -1
    var selectedAddress = -1
    var agreedOnSale = -1

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_order, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        purchase_button.setOnClickListener{
            if(selectedAddress == -1)
                Toast.makeText(requireContext(),"Please Select Your Address", Toast.LENGTH_SHORT).show()
            else if(selectedCard == -1 || cvv.text?.length != 3)
                Toast.makeText(requireContext(),"Please Select Your Payment Info", Toast.LENGTH_SHORT).show()
            else if(! agreement_checkbox.isChecked)
                Toast.makeText(requireContext(), "You should accept the Sales Agreement to proceed.", Toast.LENGTH_SHORT).show()
            else
                purchase(view)

        }
        new_card.setOnClickListener {
            val fragment = AddCardFragment()
            val bundle = Bundle()
            bundle.putBoolean("isFromOrder", true)
            fragment.arguments = bundle
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.activity_main_nav_host_fragment, fragment)
                ?.commit()
        }

        new_address.setOnClickListener {
            val fragment = AddAddressFragment()
            val bundle = Bundle()
            bundle.putBoolean("isFromOrder", true)
            fragment.arguments = bundle
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.activity_main_nav_host_fragment, fragment)
                ?.commit()
        }
        val apiCallerGetUser: ApiCaller<ResponseCustomerMe> = ApiCaller(requireActivity())
        apiCallerGetUser.Caller = ApiClient.getClient.customerMe()
        apiCallerGetUser.Success = {
            if (it != null) {
                LoginActivity.user = it.data
                updateAdapters(view)
            }
        }
        apiCallerGetUser.Failure = {}
        apiCallerGetUser.run()
        (view.findViewById<TextInputLayout>(R.id.cards_menu).editText as? AutoCompleteTextView)?.setOnItemClickListener { parent, view, position, id -> selectedCard = position }
        (view.findViewById<TextInputLayout>(R.id.address_menu).editText as? AutoCompleteTextView)?.setOnItemClickListener { parent, view, position, id -> selectedAddress = position }
        //Get selected indices from dropdown menu



        val adapter = OrderAdapter(CartFragment.ShoppingCart.cart)
        products.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(adapter)
        }
        products_overview.text="Products Overview(${CartFragment.cart.size})"
        total_cost.text = "\$${String.format("%.2f",CartFragment.totalCost())}"

        agreement_button.setOnClickListener {
            val intent = Intent(this.context, SalesAgreementActivity::class.java)
            startActivity(intent)
        }

    }

    private fun purchase(view: View) {

        val apiCallerPurchase: ApiCaller<ID> = ApiCaller(activity)
        apiCallerPurchase.Button = purchase_button
        for(product in CartFragment.cart) {
            apiCallerPurchase.Caller = ApiClient.getClient.purchaseRequest(PurchaseBody(LoginActivity.user.addresses?.get(selectedAddress)!!._id,
                LoginActivity.user.addresses?.get(selectedAddress)!!._id, LoginActivity.user.creditCards?.get(selectedCard)!!._id))
            apiCallerPurchase.Success = { it ->
                if (it != null) {
                    Toast.makeText(requireContext(),"Order Received!", android.widget.Toast.LENGTH_SHORT).show()
                }
            }
            apiCallerPurchase.Failure = {}
            apiCallerPurchase.run()
        }
    }


    private fun updateAdapters(view: View){
        if(LoginActivity.isInit()) {

            val addressList = ArrayList<String>()
            val creditCardList = ArrayList<String>()
            val addresses = LoginActivity.user.addresses
            val creditCards = LoginActivity.user.creditCards
            if (addresses != null) {
                for (item in addresses) {
                    addressList.add(item.address)
                }
            }
            if (creditCards != null) {
                for (item in creditCards) {
                    val displayNumber = item.creditCardNumber.replace(
                        "^\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d\\d".toRegex(),
                        "**** **** **** "
                    )
                    creditCardList.add(displayNumber)
                }
            }
            val addressAdapter =
                ArrayAdapter(requireContext(), R.layout.shopping_list_names, addressList.toTypedArray())
            (view.findViewById<TextInputLayout>(R.id.address_menu).editText as? AutoCompleteTextView)?.setAdapter(
                addressAdapter
            )

            val cardsAdapter =
                ArrayAdapter(requireContext(), R.layout.shopping_list_names, creditCardList.toTypedArray())
            (view.findViewById<TextInputLayout>(R.id.cards_menu).editText as? AutoCompleteTextView)?.setAdapter(
                cardsAdapter
            )
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