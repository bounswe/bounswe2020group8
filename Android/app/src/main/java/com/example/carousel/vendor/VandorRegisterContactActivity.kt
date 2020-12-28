package com.example.carousel.vendor

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.TextUtils
import android.util.Patterns
import android.view.View
import com.example.carousel.FormValidator
import com.example.carousel.R
import kotlinx.android.synthetic.main.activity_vandor_register_contact.*

class VandorRegisterContactActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vandor_register_contact)
    }

    fun cancel(view: View) {}

    fun next(view: View) {
        val validationContainer: FormValidator = FormValidator(this)
        validationContainer.AddCondition(
            vendor_signup_email.text!!.isEmpty(),
            getString(R.string.register_info_activity_email_required)
        )
        validationContainer.AddCondition(
            vendor_signup_domain.text!!.isEmpty(),
            getString(R.string.register_info_activity_domain_required)
        )
        validationContainer.AddCondition(
            !isValidEmail(vendor_signup_email.text),
            getString(R.string.register_info_valid_email)
        )

        validationContainer.RunIfValid {
            val intentContact = Intent(this, VendorRegisterPasswordActivity::class.java)
            intentContact.putExtra("email", vendor_signup_email.text.toString())
            intentContact.putExtra("domain", vendor_signup_domain.text.toString())
            intentContact.putExtra("name", intent.getStringExtra("name"))
            intentContact.putExtra("surname", intent.getStringExtra("surname"))
            intentContact.putExtra("companyName", intent.getStringExtra("companyName"))
            startActivityForResult(intentContact, 11)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (resultCode == Activity.RESULT_OK) {
            val returnIntent = Intent()
            setResult(Activity.RESULT_OK, returnIntent)
            finish()
        }
    }

    fun isValidEmail(target: CharSequence?): Boolean {
        return !TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches()
    }
}