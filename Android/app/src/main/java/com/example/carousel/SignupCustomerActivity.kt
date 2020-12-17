package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.text.SpannableString
import android.text.Spanned
import android.text.TextUtils
import android.text.method.LinkMovementMethod
import android.text.style.ClickableSpan
import android.util.Log
import android.util.Patterns
import android.view.View
import android.widget.CheckBox
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_signup_customer.*
import okhttp3.*
import java.io.IOException


class SignupCustomerActivity : AppCompatActivity() {
    lateinit var textView: TextView

    private val baseUrl = "http://18.198.51.178:8080"
    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup_customer)

        val error = intent.getIntExtra("error",2)
        if(error == 2){
             error_message.text= "Email Address Is Not Valid"
        }else if(error == 1){
            error_message.text = "Your password needs to be between 6 and 20 characters, contains at least one lower, one upper case letter and one digit"
        }else if(error == 3) {
            error_message.text = "You Have to Accept Terms and Conditions"
        }else if(error == 4) {
            error_message.text = "Passwords Does Not Match"
        }else{
            error_message.text = ""
        }

        textView = findViewById(R.id.Terms_and_condition_text)
        val text = "I have read and accept the Terms and Conditions"
        val spannableString = SpannableString(text)
        val clickableSpan: ClickableSpan = object : ClickableSpan() {
            override fun onClick(widget: View) {
                Toast.makeText(this@SignupCustomerActivity, "Terms and Conditions", Toast.LENGTH_SHORT).show()
            }
        }
        spannableString.setSpan(clickableSpan, 27, 47, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE)
        textView.setText(spannableString, TextView.BufferType.SPANNABLE)
        textView.movementMethod = LinkMovementMethod.getInstance()
    }
    fun signup(view: View) {

        val type = "CLIENT"
        val name = findViewById<EditText>(R.id.signup_name).text.toString()
        val surname = findViewById<EditText>(R.id.signup_surname).text.toString()
        val email = findViewById<EditText>(R.id.signup_email).text.toString()
        val password = findViewById<EditText>(R.id.signup_password).text.toString()
        val password2 = findViewById<EditText>(R.id.signup_password2).text.toString()
        val termCheck = findViewById<CheckBox>(R.id.accept_terms_and_conditions)

        if(!isValidEmail(email)){
            finish()
            val intent = Intent(this, SignupCustomerActivity::class.java)
            intent.putExtra("error", 2)
            startActivity(intent)
        }else if(!isStrong(password)){
            finish()
            val intent = Intent(this, SignupCustomerActivity::class.java)
            intent.putExtra("error", 1)
            startActivity(intent)
        }else if(!termCheck.isChecked) {
            finish()
            val intent = Intent(this, SignupCustomerActivity::class.java)
            intent.putExtra("error", 3)
            startActivity(intent)
        }else if(!password.equals(password2)) {
            finish()
            val intent = Intent(this, SignupCustomerActivity::class.java)
            intent.putExtra("error", 4)
            startActivity(intent)
        }else{
            signupCall(name,surname,email,password,password2,type)
        }
    }
    private fun signupCall(name: String, lastName: String, email: String, password: String, password2: String, type: String) {
        val postBody = FormBody.Builder().build()
        val httpUrl = "$baseUrl/customer/signup?name=$name&lastName=$lastName&email=$email&password=$password&passwordConfirm=$password2&type=$type"
        val request = Request.Builder()
            .addHeader("accept", "application/json")
            .url(httpUrl)
            .post(postBody)
            .build()
        println(httpUrl)
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("Failure", e.stackTraceToString())
            }


            override fun onResponse(call: Call, response: Response) {
                val json = Gson().fromJson(response.body?.string(), SignUpWithPasswordJSON::class.java)
                response.body?.string()?.let { Log.d("SIGNUP: ", it) }
                val responseCode = response.code
                if(responseCode == 200) {
                    this@SignupCustomerActivity.runOnUiThread(Runnable { //Handle UI here
                        finish();
                    })
                }
                else{
                    this@SignupCustomerActivity.runOnUiThread( Runnable {
                        Toast.makeText(this@SignupCustomerActivity, json.returnMessage, Toast.LENGTH_SHORT).show()
                    })
                }
            }
        })
    }
    fun login(view: View) {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
    }

    fun isStrong(password: String): Boolean{
        val lowerCase = "[a-z]".toRegex()
        val upperCase = "[A-Z]".toRegex()
        val number    = "[0-9]".toRegex()
        if(password.length<6 || password.length>20){
            return false
        }else if(!password.contains(lowerCase)){
            return false
        }else if(!password.contains(upperCase)){
            return false
        }else if(password.contains(" ")) {
            return false
        }else return password.contains(number)
    }
    fun isValidEmail(target: CharSequence?): Boolean {
        return !TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches()
    }
}