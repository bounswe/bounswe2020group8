package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
    fun login(view: View){
        val email = findViewById<EditText>(R.id.login_email).text.toString()
        val password = findViewById<EditText>(R.id.login_password).text.toString()

        if(email =="example@gmail.com" && password == "123456"){
            val intent = Intent(this, DashboardActivity::class.java)
            startActivity(intent)
        } else{
            Toast.makeText( this, "Invalid email or password", Toast.LENGTH_SHORT).show()
        }
    }
}