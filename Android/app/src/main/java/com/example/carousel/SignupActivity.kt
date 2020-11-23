package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity

class SignupActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup)
    }

    fun signupCustomer(view: View) {
        val intent = Intent(this, SignupCustomerActivity::class.java)
        intent.putExtra("error",0)
        startActivity(intent)
    }

    fun signupVendor(view: View) {
        val intent = Intent(this, SignupVendorActivity::class.java)
        intent.putExtra("error",0)
        startActivity(intent)
    }

    fun login(view: View) {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
    }

}