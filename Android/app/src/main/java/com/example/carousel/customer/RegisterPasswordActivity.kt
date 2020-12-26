package com.example.carousel.customer

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.util.Patterns
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.example.carousel.FormValidator
import com.example.carousel.R
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseHeader
import com.github.razir.progressbutton.bindProgressButton
import kotlinx.android.synthetic.main.activity_register_password.*


class RegisterPasswordActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register_password)
        bindProgressButton(nextPage)

        nextPage.setOnClickListener {
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

            validationContainer.RunIfValid {
                val apiCallerSignup: ApiCaller<ResponseHeader> = ApiCaller(this)
                apiCallerSignup.Button = nextPage
                apiCallerSignup.Caller = ApiClient.getClient.customerSignup(
                    intent.getStringExtra("name")!!,
                    intent.getStringExtra("surname")!!,
                    intent.getStringExtra("email")!!,
                    password.text.toString(),
                    passwordConfirm.text.toString()
                )
                apiCallerSignup.Success = {
                    if (it != null) {
                        this.runOnUiThread(Runnable { //Handle UI here
                            val returnIntent = Intent()
                            returnIntent.putExtra("result", 1)
                            setResult(Activity.RESULT_OK, returnIntent)
                            finish()
                        })
                    }
                }
                apiCallerSignup.Failure = {}
                apiCallerSignup.run()
            }


        }
    }

    fun login(view: View) {
        finish()
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

    fun isValidEmail(target: CharSequence?): Boolean {
        return !TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches()
    }
}