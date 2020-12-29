package com.example.carousel

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.Button
import android.widget.EditText
import androidx.fragment.app.Fragment
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.DataCustomerMe
import com.example.carousel.pojo.ExampleObject
import com.example.carousel.pojo.ResponseCustomerMe
import com.example.carousel.pojo.ResponseVendorMe
import kotlinx.android.synthetic.main.fragment_add_address.view.*
import kotlinx.android.synthetic.main.fragment_add_address.view.back_button
import kotlinx.android.synthetic.main.fragment_add_address.view.save_button
import kotlinx.android.synthetic.main.fragment_add_card.*
import kotlinx.android.synthetic.main.fragment_add_card.view.*

class editCardFragment (val position: Int) : Fragment() {

    var type = "GUEST"

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        type = ApplicationContext.instance.whoAmI().toString()
        pageRender(type)
        return inflater.inflate(R.layout.fragment_add_card, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        getActivity()?.getWindow()?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)

        view.back_button.setOnClickListener {
            val fragment = Settings()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_add_card, fragment)
                ?.commit()
        }
        view.save_button.setOnClickListener {

            val cardName = view.card_name.text.toString()
            val cardNumber = view.card_number.text.toString()
            val cardDate = view.card_date.text.toString()
            val cardCVC = view.card_cvc.text.toString()

            var id: String
            var name: String
            var lastName: String
            var email: String
            var isSuspended: Boolean
            var isActive: Boolean
            var shoppingLists: List<List<Product>>?
            var orders: List<ExampleObject>?
            var cart: List<ExampleObject>?
            var addresses: List<Address>?
            var telephoneNumber: String?
            var birthday: String?
            var creditCards: List<Card>?

            val apiCaller: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.customerMe()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        id = it.data.id
                        name = it.data.name
                        lastName = it.data.lastName
                        email = it.data.email
                        isSuspended = it.data.isSuspended
                        isActive = it.data.isActive
                        shoppingLists = it.data.shoppingLists
                        orders = it.data.orders
                        cart = it.data.cart
                        addresses = it.data.addresses
                        telephoneNumber = it.data.telephoneNumber
                        birthday = it.data.birthday

                        val newCard = Card(
                            cardNumber,
                            cardCVC,
                            cardDate,
                            cardName
                        )
                        creditCards = it.data.creditCards
                        var tempCreditCards = creditCards?.toMutableList()
                        if (tempCreditCards != null) {
                            tempCreditCards.removeAt(position)
                            tempCreditCards.add(position,newCard)
                        }else{
                            tempCreditCards = mutableListOf<Card>()
                            tempCreditCards.removeAt(position)
                            tempCreditCards.add(position,newCard)
                        }
                        creditCards = tempCreditCards.toList()

                        var newData = DataCustomerMe(
                            id,
                            name,
                            lastName,
                            email,
                            isSuspended,
                            isActive,
                            shoppingLists,
                            orders,
                            cart,
                            addresses,
                            telephoneNumber,
                            birthday,
                            creditCards
                        )
                        val apiCallerPatch: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
                        apiCallerPatch.Caller = ApiClient.getClient.customerUpdate(newData)
                        apiCallerPatch.Success = { it ->
                            if (it != null) {
                                activity?.runOnUiThread(Runnable { //Handle UI here
                                    val fragment = Settings()
                                    activity?.supportFragmentManager?.beginTransaction()
                                        ?.replace(R.id.fragment_account_page, fragment)
                                        ?.commit()
                                })
                            }
                        }
                        apiCallerPatch.Failure = {}
                        apiCallerPatch.run()

                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()
        }
    }
    private fun pageRender(type: String) {
        if(type.equals("CLIENT")){
            val apiCaller: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.customerMe()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        var card = it.data.creditCards?.get(position)!!
                        var editText = view?.findViewById<EditText>(R.id.card_name)
                        editText?.setHint(card.creditCardName)
                        editText = view?.findViewById<EditText>(R.id.card_number)
                        editText?.setHint(card.creditCardNumber)
                        editText = view?.findViewById<EditText>(R.id.card_date)
                        editText?.setHint(card.creditCardData)
                        editText = view?.findViewById<EditText>(R.id.card_cvc)
                        editText?.setHint(card.creditCardCvc)
                        var button = view?.findViewById<Button>(R.id.save_button)
                        button?.text = "EDIT CARD"
                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()

        }else if(type.equals("VENDOR")){
            val apiCaller: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.vendorMe()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()
        }else{

        }
    }

}