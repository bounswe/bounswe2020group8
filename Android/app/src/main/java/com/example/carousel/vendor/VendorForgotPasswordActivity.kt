package com.example.carousel.vendor

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.carousel.FormValidator
import com.example.carousel.R
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.*
import com.github.razir.progressbutton.bindProgressButton
import com.tapadoo.alerter.Alerter
import kotlinx.android.synthetic.main.activity_vendor_forgot_password.*

class VendorForgotPasswordActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vendor_forgot_password)
        bindProgressButton(forgot_password_send_email)
    }

    fun cancel(view: View) {
        finish()
    }

    fun sendEmail(view: View) {
        val validationContainer: FormValidator = FormValidator(this)
        validationContainer.AddCondition(
            vendor_forgot_password_email.text!!.isEmpty(),
            "Email is required"
        )

        validationContainer.RunIfValid {

            val apiCaller: ApiCaller<ResponseHeader> = ApiCaller(this)
            apiCaller.Button = forgot_password_send_email
            apiCaller.Caller = ApiClient.getClient.vendorForgotPassword(
                vendor_forgot_password_email.text.toString()
            )
            apiCaller.Success = { it ->
                if (it != null) {
                    this.runOnUiThread(Runnable { //Handle UI here
                        Alerter.create(this)
                            .setTitle("Success")
                            .setText("You can reset your password by using the link in your email.")
                            .setBackgroundColorRes(R.color.successGreen)
                            .show()
                        finish()
                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()
        }
    }
}