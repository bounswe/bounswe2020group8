package com.example.carousel.vendor

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.method.ScrollingMovementMethod
import android.view.LayoutInflater
import android.view.View
import androidx.appcompat.app.AlertDialog
import com.example.carousel.FormValidator
import com.example.carousel.R
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseHeader
import com.github.razir.progressbutton.bindProgressButton
import com.tapadoo.alerter.Alerter
import kotlinx.android.synthetic.main.activity_vendor_register_password.*
import kotlinx.android.synthetic.main.content_dialog.view.*

class VendorRegisterPasswordActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vendor_register_password)
        bindProgressButton(vendor_signup_send)
        term.setOnClickListener {
            val agreementContentView = LayoutInflater.from(this)
                .inflate(R.layout.content_dialog, null)
            //AlertDialogBuilder
            val dialogBuilder = AlertDialog.Builder(this)
                .setView(agreementContentView)

            agreementContentView.content.movementMethod = ScrollingMovementMethod()
            //show dialog
            val agreementDialog = dialogBuilder.show()

            agreementContentView.close.setOnClickListener {
                agreementDialog.dismiss()
            }
        }
    }

    fun isStrong(password: String): Boolean {
        val lowerCase = "[a-z]".toRegex()
        val upperCase = "[A-Z]".toRegex()
        val number = "[0-9]".toRegex()
        if (password.length < 6 || password.length > 20) {
            return false
        } else if (!password.contains(lowerCase)) {
            return false
        } else if (!password.contains(upperCase)) {
            return false
        } else if (password.contains(" ")) {
            return false
        } else return password.contains(number)
    }

    fun send(view: View) {
        val validationContainer: FormValidator = FormValidator(this)
        validationContainer.AddCondition(
            password.text!!.isEmpty(),
            getString(R.string.register_password_required_password)
        )

        validationContainer.AddCondition(
            !isStrong(password.text.toString()),
            getString(R.string.strong_password_error)
        )

        validationContainer.AddCondition(
            passwordConfirm.text!!.trim() != password!!.text!!.trim(),
            getString(R.string.register_password_confirm_error)
        )

        validationContainer.AddCondition(
            !(termConfirm.isChecked),
            getString(R.string.register_confirm_terms_warning)
        )

        validationContainer.RunIfValid {
            val apiCallerSignup: ApiCaller<ResponseHeader> = ApiCaller(this)
            apiCallerSignup.Button = vendor_signup_send
            apiCallerSignup.Caller = ApiClient.getClient.vendorSignUp(
                intent.getStringExtra("name")!!,
                intent.getStringExtra("surname")!!,
                intent.getStringExtra("companyName")!!,
                intent.getStringExtra("domain")!!,
                intent.getStringExtra("email")!!,
                password.text.toString(),
                passwordConfirm.text.toString()
            )
            apiCallerSignup.Success = {
                if (it != null) {
                    this.runOnUiThread(Runnable { //Handle UI here
                        Alerter.create(this)
                            .setTitle("Success")
                            .setText("Please verify yourself using link in your email.")
                            .setBackgroundColorRes(R.color.successGreen)
                            .show()
                        val returnIntent = Intent()
                        setResult(Activity.RESULT_OK, returnIntent)
                        finish()
                    })
                }
            }
            apiCallerSignup.Failure = {}
            apiCallerSignup.run()
        }
    }
    fun cancel(view: View) {
        finish()
    }
}