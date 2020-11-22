package com.example.carousel
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.RadioButton
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import okhttp3.*
import java.io.IOException


class LoginActivity : AppCompatActivity() {
    private val baseUrl = "http://10.0.2.2:3000"
    private val client = OkHttpClient()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
    }
    fun login(view: View){
        val email = findViewById<EditText>(R.id.login_email).text.toString()
        val password = findViewById<EditText>(R.id.login_password).text.toString()
        val type: String
        when(findViewById<RadioButton>(R.id.radio_button_customer).isChecked) {
            true -> type = "CLIENT";
            false -> type = "VENDOR"
        }
        loginCall(email, password, type)


    }
    private fun loginCall(email: String, password: String, type: String) {
        val postBody = FormBody.Builder().build()
        val httpUrl = "$baseUrl/client?email=$email&password=$password&type=$type"
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
                val json = Gson().fromJson(response.body?.string(), HttpResponse::class.java)
                val responseCode = response.code
                if(responseCode == 200) {
                    this@LoginActivity.runOnUiThread(Runnable { //Handle UI here
                        val intent = Intent(this@LoginActivity, DashboardActivity::class.java)
                        intent.putExtra("token", json.tokenCode)
                        intent.putExtra("login", 1)
                        finish();
                    })
                }
                else{
                    this@LoginActivity.runOnUiThread( Runnable {
                        Toast.makeText(this@LoginActivity, "Invalid email or password", Toast.LENGTH_SHORT).show()
                    })
                }
            }
        })
    }
    fun signup(view: View) {
        val intent = Intent(this, SignupActivity::class.java)
        startActivity(intent)
    }
}

data class HttpResponse (
    @SerializedName("tokenCode") val tokenCode : String,
    @SerializedName("returnCode") val returnCode: Int,
    @SerializedName("returnMessage") val returnMessage: String,
    @SerializedName("client") val client: Client
)
data class Client (
    @SerializedName("id") val id : String,
    @SerializedName("email") val email : String,
    @SerializedName("type") val type : String,
)
