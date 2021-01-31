package com.example.carousel

import android.content.Context
import android.os.Bundle
import android.text.InputType
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.view.inputmethod.EditorInfo
import android.widget.Button
import android.widget.EditText
import androidx.fragment.app.Fragment
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.*
import com.example.carousel.vendor.Location
import kotlinx.android.synthetic.*
import kotlinx.android.synthetic.main.activity_product_page.view.*
import kotlinx.android.synthetic.main.fragment_acount_page.*
import kotlinx.android.synthetic.main.fragment_user_information.*
import kotlinx.android.synthetic.main.fragment_user_information.view.*


class UserInformationFragment : Fragment(){

    var type = "GUEST"

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        type = ApplicationContext.instance.whoAmI().toString()
        return inflater.inflate(R.layout.fragment_user_information, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        pageRender(type)

        view.back.setOnClickListener{
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
            var editText = activity!!.findViewById<EditText>(R.id.profile_name_value)
            editText.isEnabled = if (editText.isEnabled) {false} else {true}
            editText.isClickable = if (editText.isEnabled) {false} else {true}
            editText = activity!!.findViewById<EditText>(R.id.profile_surname_value)
            editText.isEnabled = if (editText.isEnabled) {false} else {true}
            editText.isClickable = if (editText.isEnabled) {false} else {true}
            editText = activity!!.findViewById<EditText>(R.id.profile_number_value)
            editText.isEnabled = if (editText.isEnabled) {false} else {true}
            editText.isClickable = if (editText.isEnabled) {false} else {true}
            editText = activity!!.findViewById<EditText>(R.id.profile_birthday_value)
            editText.isEnabled = if (editText.isEnabled) {false} else {true}
            editText.isClickable = if (editText.isEnabled) {false} else {true}

            var newInfo = ""
            if(button?.text?.equals("EDIT") == true){
                var editText = activity!!.findViewById<EditText>(R.id.profile_name_value)
                if(editText.text.isNotBlank()){
                    newInfo = editText.text.toString()+","
                }else{
                    if(editText.hint.isNullOrBlank()){
                        newInfo = ","
                    }else {
                        newInfo = editText.hint.toString()+","
                    }
                }
                editText = activity!!.findViewById<EditText>(R.id.profile_surname_value)
                if(editText.text.isNotBlank()){
                    newInfo = newInfo+editText.text.toString()+","
                }else{
                    if(editText.hint.isNullOrBlank()){
                        newInfo = newInfo+","
                    }else {
                        newInfo = newInfo + editText.hint.toString() +","
                    }
                }
                editText = activity!!.findViewById<EditText>(R.id.profile_number_value)
                if(editText.text.isNotBlank()){
                    newInfo = newInfo+editText.text.toString()+","
                }else{
                    if(editText.hint.isNullOrBlank()){
                        newInfo = newInfo+","
                    }else {
                        newInfo = newInfo  + editText.hint.toString()+ ","
                    }
                }
                editText = activity!!.findViewById<EditText>(R.id.profile_birthday_value)
                if(editText.text.isNotBlank()){
                    newInfo = newInfo+editText.text.toString()+","
                }else{
                    if(editText.hint.isNullOrBlank()){
                        newInfo = newInfo+","
                    }else {
                        newInfo = newInfo  + editText.hint.toString()+ ","
                    }
                }
                updateInfo(type, newInfo)

            }
        }
    }

    private fun pageRender(type: String) {
        if(type.equals("CLIENT")){
            val apiCaller: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.customerMe()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        var editText = activity!!.findViewById<EditText>(R.id.profile_name_value)
                        editText.setHint(it.data.name)
                        editText = activity!!.findViewById<EditText>(R.id.profile_surname_value)
                        editText.setHint(it.data.lastName)
                        editText = activity!!.findViewById<EditText>(R.id.profile_email_value)
                        editText.setHint(it.data.email)
                        editText = activity!!.findViewById<EditText>(R.id.profile_number_value)
                        editText.setHint(it.data.telephoneNumber)
                        editText = activity!!.findViewById<EditText>(R.id.profile_birthday_value)
                        editText.setHint(it.data.birthday)
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

                        profile_name_tag.text = "COMPANY NAME"
                        var editText = activity!!.findViewById<EditText>(R.id.profile_name_value)
                        editText.setHint(it.data.companyName)

                        profile_surname_tag.text = "DOMAIN"
                        editText = activity!!.findViewById<EditText>(R.id.profile_surname_value)
                        editText.setHint(it.data.companyDomainName)

                        editText = activity!!.findViewById<EditText>(R.id.profile_email_value)
                        editText.setHint(it.data.email)

                        profile_number_tag.text = "ABOUT"
                        editText = activity!!.findViewById<EditText>(R.id.profile_number_value)
                        editText.inputType = InputType.TYPE_TEXT_FLAG_MULTI_LINE or InputType.TYPE_TEXT_VARIATION_POSTAL_ADDRESS
                        editText.setSingleLine(false)
                        editText.setImeOptions(EditorInfo.IME_FLAG_NO_ENTER_ACTION);
                        editText.setHint(it.data.aboutCompany)

                        profile_birthday_tag.text = "IBAN"
                        editText = activity!!.findViewById<EditText>(R.id.profile_birthday_value)
                        editText.setHint(it.data.IBAN)
                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()
        }else{

        }
    }
    private fun updateInfo(type: String, info: String) {
        if(type.equals("CLIENT")){
            var id: String
            var name: String
            var lastName: String
            var email: String
            var isSuspended: Boolean
            var isActive: Boolean
            var shoppingLists: List<List<Product>>?
            var orders: List<ExampleObject>?
            var cart: List<ExampleObject>?
            var addresses: ArrayList<AddressJSON>?
            var telephoneNumber: String?
            var birthday: String?
            var creditCards: ArrayList<CreditCardJSON>?

            var infoTemp = info
            val apiCaller: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.customerMe()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        id = it.data.id

                        name = infoTemp.subSequence(0, infoTemp.indexOf(",")).toString()
                        infoTemp = infoTemp.subSequence(infoTemp.indexOf(",")+1, infoTemp.length).toString()

                        lastName = infoTemp.subSequence(0, infoTemp.indexOf(",")).toString()
                        infoTemp = infoTemp.subSequence(infoTemp.indexOf(",")+1, infoTemp.length).toString()

                        email = it.data.email
                        isSuspended = it.data.isSuspended
                        isActive = it.data.isActive
                        //shoppingLists = it.data.shoppingLists
                        orders = it.data.orders
                        cart = it.data.cart
                        addresses = it.data.addresses

                        telephoneNumber = infoTemp.subSequence(0, infoTemp.indexOf(",")).toString()
                        infoTemp = infoTemp.subSequence(infoTemp.indexOf(",")+1, infoTemp.length).toString()

                        birthday = infoTemp.subSequence(0, infoTemp.indexOf(",")).toString()
                        infoTemp = infoTemp.subSequence(infoTemp.indexOf(",")+1, infoTemp.length).toString()

                        creditCards = it.data.creditCards
                        var newData = DataCustomerMe(
                            id,
                            name,
                            lastName,
                            email,
                            isSuspended,
                            isActive,
                            //shoppingLists,
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

        }else if(type.equals("VENDOR")){
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

            var infoTemp = info

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

                        companyName = infoTemp.subSequence(0, infoTemp.indexOf(",")).toString()
                        infoTemp = infoTemp.subSequence(infoTemp.indexOf(",")+1, infoTemp.length).toString()

                        companyDomainName = infoTemp.subSequence(0, infoTemp.indexOf(",")).toString()
                        infoTemp = infoTemp.subSequence(infoTemp.indexOf(",")+1, infoTemp.length).toString()

                        aboutCompany = infoTemp.subSequence(0, infoTemp.indexOf(",")).toString()
                        infoTemp = infoTemp.subSequence(infoTemp.indexOf(",")+1, infoTemp.length).toString()

                        IBAN = infoTemp.subSequence(0, infoTemp.indexOf(",")).toString()
                        infoTemp = infoTemp.subSequence(infoTemp.indexOf(",")+1, infoTemp.length).toString()

                        address = it.data.address
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
        }else{

        }
    }
}