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
import com.example.carousel.pojo.ResponseCustomerMe
import com.example.carousel.pojo.ResponseVendorMe
import kotlinx.android.synthetic.main.fragment_add_address.view.back_button

class AddCardFragment : Fragment() {

    var type = "GUEST"


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        type = ApplicationContext.instance.whoAmI().toString()
        return inflater.inflate(R.layout.fragment_add_card, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        pageRender(type)
        getActivity()?.getWindow()?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)
        view.back_button.setOnClickListener{
            val fragment = Settings()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_add_card, fragment)
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
    private fun addCard(){

    }

}
