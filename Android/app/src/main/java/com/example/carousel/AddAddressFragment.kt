package com.example.carousel

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import androidx.fragment.app.Fragment
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.DataCustomerMe
import com.example.carousel.pojo.ExampleObject
import com.example.carousel.pojo.ResponseCustomerMe
import com.example.carousel.pojo.ResponseVendorMe
import kotlinx.android.synthetic.main.fragment_add_address.view.*
import kotlinx.android.synthetic.main.fragment_user_information.view.*
import kotlinx.android.synthetic.main.fragment_add_address.view.address_name as address_name1

class AddAddressFragment : Fragment() {

    var type = "GUEST"


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        type = ApplicationContext.instance.whoAmI().toString()
        return inflater.inflate(R.layout.fragment_add_address, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        pageRender(type)
        getActivity()?.getWindow()?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)

        view.back_button.setOnClickListener{
            val fragment = Settings()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_add_adress, fragment)
                ?.commit()
        }
        view.save_button.setOnClickListener{
            val addressName = view.address_name.text.toString()
            val addressCity = view.address_city.text.toString()
            val addressState = view.address_state.text.toString()
            val addressZipcode = view.address_zipcode.text.toString()
            val addressBlock = view.address_block.text.toString()

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
            var creditCards: List<ExampleObject>?

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

                        val newAddress = Address(
                            addressName,
                            null,
                            addressBlock,
                            addressCity,
                            addressState,
                            addressZipcode,
                            it.data.telephoneNumber
                        )
                        println(newAddress.toString())
                        addresses = it.data.addresses
                        println(addresses.toString())
//                        addresses?.toMutableList()?.add(newAddress)
//                        addresses?.toList()
                        var tempAddresses = addresses?.toMutableList()
                        if (tempAddresses != null) {
                            tempAddresses.add(newAddress)
                        }else{
                            tempAddresses = mutableListOf<Address>()
                            tempAddresses.add(newAddress)
                        }
                        addresses = tempAddresses?.toList()

                        telephoneNumber = it.data.telephoneNumber
                        birthday = it.data.birthday
                        creditCards = it.data.creditCards

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
                                    pageRender(type)
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
                        println(it.data.addresses?.get(0)?.addressName)
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

