package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.RadioButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_login.*

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
    }
    fun login(view: View){
        val email = findViewById<EditText>(R.id.login_email).text.toString()
        val password = findViewById<EditText>(R.id.login_password).text.toString()
        if(email =="example@gmail.com" && password == "123456" && findViewById<RadioButton>(R.id.radio_button_customer).isChecked){
            val intent = Intent(this, DashboardActivity::class.java)
            intent.putExtra("login", 1);
            setResult(22, intent); // You can also send result without any data using setResult(int resultCode)
            finish();
        } else{
            Toast.makeText( this, "Invalid email or password", Toast.LENGTH_SHORT).show()
        }
    }
    fun signup(view: View) {
        val intent = Intent(this, SignupActivity::class.java)
        startActivity(intent)
    }
}