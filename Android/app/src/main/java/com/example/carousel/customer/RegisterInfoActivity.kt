package com.example.carousel.customer


import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AlertDialog
import android.text.method.ScrollingMovementMethod
import android.view.LayoutInflater
import com.example.carousel.R
import kotlinx.android.synthetic.main.content_dialog.view.*
import com.example.carousel.FormValidator
import android.text.TextUtils
import android.util.Patterns
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_register_info.*


class RegisterInfoActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register_info)

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

        nextPage.setOnClickListener {

            val validationContainer: FormValidator = FormValidator(this)
            validationContainer.AddCondition(
                customer_signup__name.text!!.isEmpty(),
                getString(R.string.register_info_activity_name_required)
            )
            validationContainer.AddCondition(
                customer_signup__surname.text!!.isEmpty(),
                getString(R.string.register_info_activity_surname_required)
            )
            validationContainer.AddCondition(
                customer_signup__email.text!!.isEmpty(),
                getString(R.string.register_info_activity_email_required)
            )
            validationContainer.AddCondition(
                !(termConfirm.isChecked),
                getString(R.string.register_info_activity_checkbox)
            )
            validationContainer.AddCondition(
                !isValidEmail(customer_signup__email.text!!.trim()),
                getString(R.string.register_info_valid_email)
            )

            validationContainer.RunIfValid {
                val intent = Intent(this, RegisterPasswordActivity::class.java)
                intent.putExtra("name", customer_signup__name.text.toString())
                intent.putExtra("surname", customer_signup__surname.text.toString())
                intent.putExtra("email", customer_signup__email.text.toString())
                startActivityForResult(intent, 11)
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        val result = data?.getIntExtra("result", 0)

        if (result == 1){
            finish()
        }

    }

    fun isValidEmail(target: CharSequence?): Boolean {
        return !TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches()
    }
}
