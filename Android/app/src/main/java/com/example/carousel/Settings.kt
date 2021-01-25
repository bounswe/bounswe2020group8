package com.example.carousel

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.Button
import android.widget.EditText
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.DataVendorMe
import com.example.carousel.pojo.ResponseCustomerMe
import com.example.carousel.pojo.ResponseCustomerMe2
import com.example.carousel.pojo.ResponseVendorMe
import com.example.carousel.vendor.Location
import kotlinx.android.synthetic.main.fragment_add_address.view.*
import kotlinx.android.synthetic.main.fragment_add_address.view.address_block
import kotlinx.android.synthetic.main.fragment_add_address.view.address_city
import kotlinx.android.synthetic.main.fragment_add_address.view.address_state
import kotlinx.android.synthetic.main.fragment_add_address.view.address_zipcode
import kotlinx.android.synthetic.main.fragment_settings.view.*
import kotlinx.android.synthetic.main.fragment_settings_vendor.view.*
import kotlinx.android.synthetic.main.fragment_user_information.view.*
import kotlinx.android.synthetic.main.fragment_user_information.view.back
import kotlinx.android.synthetic.main.fragment_user_information.view.profile_delete_1

class Settings : Fragment() {

    var type = "GUEST"
    var addresses: List<Address>? = null
    var creditCards: List<Card>? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        type = ApplicationContext.instance.whoAmI().toString()
        pageRender(type)
        if(type.equals("CLIENT")) {
            return inflater.inflate(R.layout.fragment_settings, container, false)
        }else if(type.equals("VENDOR")){
            return inflater.inflate(R.layout.fragment_settings_vendor, container, false)
        }else{
            return null
        }
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if(type.equals("CLIENT")) {
            view.profile_address_add.setOnClickListener {
                val fragment = AddAddressFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_settings, fragment)
                    ?.commit()
            }
            view.profile_card_add.setOnClickListener {
                val fragment = AddCardFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_settings, fragment)
                    ?.commit()
            }
        }else if(type.equals("VENDOR")) {
            view.back.setOnClickListener {
                val fragment = MemberAccountPageFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }
            getActivity()?.getWindow()?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
            view.profile_delete_1.setOnClickListener{
                var button = activity?.findViewById<Button>(R.id.profile_delete_1)
                var temp = if(button?.text?.equals("EDIT") == true) {"SAVE"} else {"EDIT"}
                button?.setText(temp)
                var editText = activity!!.findViewById<EditText>(R.id.address_name_value)
                editText.isEnabled = if (editText.isEnabled) {false} else {true}
                editText.isClickable = if (editText.isEnabled) {false} else {true}
                editText = activity!!.findViewById<EditText>(R.id.address_city_value)
                editText.isEnabled = if (editText.isEnabled) {false} else {true}
                editText.isClickable = if (editText.isEnabled) {false} else {true}
                editText = activity!!.findViewById<EditText>(R.id.address_state_value)
                editText.isEnabled = if (editText.isEnabled) {false} else {true}
                editText.isClickable = if (editText.isEnabled) {false} else {true}
                editText = activity!!.findViewById<EditText>(R.id.address_zipcode_value)
                editText.isEnabled = if (editText.isEnabled) {false} else {true}
                editText.isClickable = if (editText.isEnabled) {false} else {true}
                editText = activity!!.findViewById<EditText>(R.id.address_block_value)
                editText.isEnabled = if (editText.isEnabled) {false} else {true}
                editText.isClickable = if (editText.isEnabled) {false} else {true}
                editText = activity!!.findViewById<EditText>(R.id.address_telephone_value)
                editText.isEnabled = if (editText.isEnabled) {false} else {true}
                editText.isClickable = if (editText.isEnabled) {false} else {true}

                if(button?.text?.equals("EDIT") == true){
                    updateInfo(type, view)
                }

                }
        }
    }

    private fun pageRender(type: String) {
        if(type.equals("CLIENT")){
            val apiCaller: ApiCaller<ResponseCustomerMe2> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.customerMe2()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        addresses = it.data.addresses
                        creditCards = it.data.creditCards

                        val adapter = AddressAdapter(addresses as ArrayList<Address>, activity!!)
                        val addressRecyclerView = activity!!.findViewById<RecyclerView>(R.id.profile_addresses_scroll)
                        addressRecyclerView.apply {
                            layoutManager = LinearLayoutManager(this.context,LinearLayoutManager.VERTICAL, false)
                            setAdapter(adapter)
                        }

                        val adapter2 = CardAdapter(creditCards as ArrayList<Card>, activity!!)
                        val addressRecyclerView2 = activity!!.findViewById<RecyclerView>(R.id.profile_cards_scroll)
                        addressRecyclerView2.apply {
                            layoutManager = LinearLayoutManager(this.context,LinearLayoutManager.VERTICAL, false)
                            setAdapter(adapter2)
                        }

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
                        var address = it.data.address
                        var editText = activity!!.findViewById<EditText>(R.id.address_name_value)
                        editText.setHint(address?.addressName)
                        editText = activity!!.findViewById<EditText>(R.id.address_city_value)
                        editText.setHint(address?.city)
                        editText = activity!!.findViewById<EditText>(R.id.address_state_value)
                        editText.setHint(address?.state)
                        editText = activity!!.findViewById<EditText>(R.id.address_zipcode_value)
                        editText.setHint(address?.zipCode)
                        editText = activity!!.findViewById<EditText>(R.id.address_block_value)
                        editText.setHint(address?.addressLine)
                        editText = activity!!.findViewById<EditText>(R.id.address_telephone_value)
                        editText.setHint(address?.phone)
                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()
        }else{

        }
    }
    private fun updateInfo(type: String, view: View) {
        var addressName = ""
        var addressCity = ""
        var addressState = ""
        var addressZipcode = ""
        var addressBlock = ""
        var addressTelephone = ""
        if(view.address_name_value.text.toString().isNotBlank()) {
            addressName = view.address_name_value.text.toString()
        }else{
            addressName = view.address_name_value.hint.toString()
        }
        if(view.address_city_value.text.toString().isNotBlank()) {
            addressCity = view.address_city_value.text.toString()
        }else{
            addressCity = view.address_city_value.hint.toString()
        }
        if(view.address_state_value.text.toString().isNotBlank()) {
            addressState = view.address_state_value.text.toString()
        }else{
            addressState = view.address_state_value.hint.toString()
        }
        if(view.address_zipcode_value.text.toString().isNotBlank()) {
            addressZipcode = view.address_zipcode_value.text.toString()
        }else{
            addressZipcode = view.address_zipcode_value.hint.toString()
        }
        if(view.address_block_value.text.toString().isNotBlank()) {
            addressBlock = view.address_block_value.text.toString()
        }else{
            addressBlock = view.address_block_value.hint.toString()
        }
        if(view.address_telephone_value.text.toString().isNotBlank()) {
            addressTelephone = view.address_telephone_value.text.toString()
        }else{
            addressTelephone = view.address_telephone_value.hint.toString()
        }

        var id: String
        var name: String?
        var lastName: String?
        var email: String
        var isSuspended: Boolean
        var isActive: Boolean
        var companyName: String?
        var companyDomainName: String?
        var aboutCompany: String?
        var IBAN: String?
        var address: Address?
        var locations: ArrayList<Location>?

//        var infoTemp = info

        val apiCaller: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
        apiCaller.Caller = ApiClient.getClient.vendorMe()
        apiCaller.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here

                    id = it.data.id
                    name = it.data.name
                    lastName = it.data.lastName
                    email = it.data.email
                    isSuspended = it.data.isSuspended
                    isActive = it.data.isActive
                    companyName = it.data.companyName
                    companyDomainName = it.data.companyDomainName
                    aboutCompany = it.data.aboutCompany
                    IBAN = it.data.IBAN

                    val newAddress = Address(
                        addressName,
                        null,
                        addressBlock,
                        addressCity,
                        addressState,
                        addressZipcode,
                        addressTelephone
                    )
                    address = newAddress
                    locations = it.data.locations

                    var newData = DataVendorMe(
                        id,
                        name,
                        lastName,
                        email,
                        isSuspended,
                        isActive,
                        companyName,
                        companyDomainName,
                        aboutCompany,
                        IBAN,
                        address,
                        locations,
                    )

                    val apiCallerPatch: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
                    apiCallerPatch.Caller = ApiClient.getClient.vendorUpdate(newData)
                    apiCallerPatch.Success = { it ->
                        if (it != null) {
                            activity?.runOnUiThread(Runnable { //Handle UI here
                                pageRender(type)
                                val fragment = MemberAccountPageFragment()
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
    override fun onResume() {
        super.onResume()
        //(activity as AppCompatActivity?)!!.supportActionBar!!.hide()
    }

    override fun onStop() {
        super.onStop()
        //(activity as AppCompatActivity?)!!.supportActionBar!!.show()
    }
}
