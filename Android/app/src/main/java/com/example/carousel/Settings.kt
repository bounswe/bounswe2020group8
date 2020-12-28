package com.example.carousel

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.core.view.marginLeft
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ExampleObject
import com.example.carousel.pojo.ResponseCustomerMe
import com.example.carousel.pojo.ResponseVendorMe
import kotlinx.android.synthetic.main.fragment_settings.view.*

class Settings : Fragment() {

    var type = "GUEST"
    var addresses: List<Address>? = null
    var creditCards: List<Card>? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        type = ApplicationContext.instance.whoAmI().toString()
        pageRender(type)
        return inflater.inflate(R.layout.fragment_settings, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        view.profile_address_add.setOnClickListener{
            val fragment = AddAddressFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_settings, fragment)
                ?.commit()
        }
        view.profile_card_add.setOnClickListener{
            val fragment = AddCardFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_settings, fragment)
                ?.commit()
        }

    }

    private fun pageRender(type: String) {
        if(type.equals("CLIENT")){
            val apiCaller: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.customerMe()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        addresses = it.data.addresses
                        creditCards = it.data.creditCards

                        val adapter = AddressAdapter(addresses as ArrayList<Address>)
                        val addressRecyclerView = activity!!.findViewById<RecyclerView>(R.id.profile_addresses_scroll)
                        addressRecyclerView.apply {
                            layoutManager = LinearLayoutManager(this.context,LinearLayoutManager.VERTICAL, false)
                            setAdapter(adapter)
                        }

                        val adapter2 = CardAdapter(creditCards as ArrayList<Card>)
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
                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()
        }else{

        }
    }

}
