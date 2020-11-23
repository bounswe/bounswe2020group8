package com.example.carousel

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import kotlinx.android.synthetic.main.activity_forgot_password.view.*
import okhttp3.*
import java.io.IOException

class ForgotPasswordActivity : AppCompatActivity() {
    private val baseUrl = "http://18.198.51.178:8080"
    private val client = OkHttpClient()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_forgot_password)
    }


    fun sendEmail(view: View) {
        val email = view.forgot_password_email.text.toString()
        val postBody = FormBody.Builder().build()
        val type = "CLIENT"
        val httpUrl = "$baseUrl//client/forgotPassword?email=$email&type=$type"
        val request = Request.Builder()
            .addHeader("accept", "application/json")
            .url(httpUrl)
            .post(postBody)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                Log.e("Failure", e.stackTraceToString())
            }


            override fun onResponse(call: Call, response: Response) {
                val json =
                    Gson().fromJson(response.body?.string(), LoginWithPasswordJSON::class.java)
                val responseCode = response.code
                if (responseCode == 200) {
                    this@ForgotPasswordActivity.runOnUiThread(Runnable { //Handle UI here
                        Toast.makeText(
                            this@ForgotPasswordActivity,
                            "You can reset your password by using the link in your email.",
                            Toast.LENGTH_SHORT
                        ).show()
                    })
                } else {
                    this@ForgotPasswordActivity.runOnUiThread(Runnable {
                        Toast.makeText(
                            this@ForgotPasswordActivity,
                            "Invalid email ",
                            Toast.LENGTH_SHORT
                        ).show()
                    })
                }
            }
        })
    }

    fun cancel(view: View) {
        this@ForgotPasswordActivity.finish()
    }
}
