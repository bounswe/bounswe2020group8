package com.example.carousel.vendor

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.method.LinkMovementMethod
import android.view.View
import com.example.carousel.ForgotPasswordActivity
import com.example.carousel.FormValidator
import com.example.carousel.R
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseCustomerMe
import com.example.carousel.pojo.ResponseLogin
import kotlinx.android.synthetic.main.activity_vendor_login.*


class VendorLoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vendor_login)
        forgotPassword.setOnClickListener {
            val intent = Intent(this, VendorForgotPasswordActivity::class.java)
            startActivity(intent)
            forgotPassword.movementMethod = LinkMovementMethod.getInstance()
        }
    }

    fun signup(view: View) {

    }

    fun login(view: View) {
        val validationContainer: FormValidator = FormValidator(this)
        validationContainer.AddCondition(login_vendor_email.text!!.isEmpty(), "Email is required")
        validationContainer.AddCondition(
            login_vendor_password.text!!.isEmpty(),
            "Password is required"
        )
        validationContainer.RunIfValid {

            val apiCallerLogin: ApiCaller<ResponseLogin> = ApiCaller(this)
            apiCallerLogin.Button = login_button
            apiCallerLogin.Caller = ApiClient.getClient.vendorLogin(
                login_vendor_email.text.toString(),
                login_vendor_password.text.toString()
            )
            apiCallerLogin.Success = { it ->
                if (it != null) {
                    this.runOnUiThread(Runnable { //Handle UI here

                        val prefs =
                            getSharedPreferences("userInfo", Context.MODE_PRIVATE)
                        val editor = prefs.edit()
                        editor.putString("token", it.tokenCode)
                        editor.putBoolean("isAuthenticated", true)
                        editor.putString("type", "VENDOR")
                        editor.apply()
                        ApplicationContext.instance.authenticate(it.tokenCode, "VENDOR")

                        val returnIntent = Intent()
                        setResult(Activity.RESULT_OK, returnIntent)
                        finish()
                    })
                }
            }
            apiCallerLogin.Failure = {}
            apiCallerLogin.run()
        }
    }
}