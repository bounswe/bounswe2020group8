package com.example.carousel

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.EditText
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseChangePassword
import com.example.carousel.pojo.ResponseCustomerMe
import com.example.carousel.pojo.ResponseHeader
import com.example.carousel.pojo.ResponseLogin
import com.google.gson.Gson
import kotlinx.android.synthetic.main.fragment_acount_page.view.*
import kotlinx.android.synthetic.main.fragment_change_password.*
import kotlinx.android.synthetic.main.fragment_change_password.view.*
import okhttp3.*
import java.io.IOException

class ChangePasswordFragment: Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        getActivity()?.getWindow()?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        return inflater.inflate(R.layout.fragment_change_password, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        getActivity()?.getWindow()?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        view.change_password_button.setOnClickListener {

            val oldPasswordEditText = view.findViewById(R.id.old_password) as EditText
            val newPasswordEditText = view.findViewById(R.id.new_password) as EditText
            val newPasswordRepeatEditText = view.findViewById(R.id.new_password_confirm) as EditText

            val oldPassword = oldPasswordEditText.text.toString()
            val newPassword = newPasswordEditText.text.toString()
            val newPasswordRepeat = newPasswordRepeatEditText.text.toString()
            val apiCaller: ApiCaller<ResponseChangePassword> = ApiCaller(activity)
            apiCaller.Button = change_password_button
            apiCaller.Caller = ApiClient.getClient.customerChangePassword(oldPassword, newPassword, newPasswordRepeat)
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        val fragment = MemberAccountPageFragment()
                        activity?.supportFragmentManager?.beginTransaction()
                            ?.replace(R.id.fragment_account_page, fragment)
                            ?.commit()
                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()
        }
        view.cancel_button.setOnClickListener {
            val fragment = MemberAccountPageFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_account_page, fragment)
                ?.commit()
        }

    }
}