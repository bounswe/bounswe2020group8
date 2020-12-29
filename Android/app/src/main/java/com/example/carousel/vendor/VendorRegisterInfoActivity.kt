package com.example.carousel.vendor

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.example.carousel.FormValidator
import com.example.carousel.R

import kotlinx.android.synthetic.main.activity_vendor_register_info.*

class VendorRegisterInfoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vendor_register_info)
    }

    fun cancel(view: View) {
        finish()
    }

    fun next(view: View) {

        val validationContainer: FormValidator = FormValidator(this)
        validationContainer.AddCondition(
            vendor_signup_name.text!!.isEmpty(),
            getString(R.string.register_info_activity_name_required)
        )
        validationContainer.AddCondition(
            vendor_signup_surname.text!!.isEmpty(),
            getString(R.string.register_info_activity_surname_required)
        )
        validationContainer.AddCondition(
            vendor_signup_company_name.text!!.isEmpty(),
            getString(R.string.register_info_activity_company_name_required)
        )
        validationContainer.RunIfValid {
            val intent = Intent(this, VandorRegisterContactActivity::class.java)
            intent.putExtra("name", vendor_signup_name.text.toString())
            intent.putExtra("surname", vendor_signup_surname.text.toString())
            intent.putExtra("companyName", vendor_signup_company_name.text.toString())
            startActivityForResult(intent, 11)
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
}