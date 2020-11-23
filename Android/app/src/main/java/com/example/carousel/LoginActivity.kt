package com.example.carousel
import android.content.Intent
import android.os.Bundle
import android.text.method.LinkMovementMethod
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.RadioButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import kotlinx.android.synthetic.main.activity_login.*
import okhttp3.*
import java.io.IOException


class LoginActivity : AppCompatActivity() {
    //private val baseUrl = "http://10.0.2.2:3000"
    private val baseUrl = "http://18.198.51.178:8080"
    private val RC_SIGN_IN = 1
    private var mGoogleSignInClient: GoogleSignInClient? = null
    private val client = OkHttpClient()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val gso =
            GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build()

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso)
        val google_signIn_btn = findViewById<com.google.android.gms.common.SignInButton>(R.id.sign_in_button)
        google_signIn_btn.setOnClickListener {
            signIn()
        }
        val forgotPasswordButton = findViewById<TextView>(R.id.forgotPassword)
        forgotPasswordButton.setOnClickListener{
            val intent = Intent(this, ForgotPasswordActivity::class.java)
            startActivity(intent)

            forgotPassword.movementMethod = LinkMovementMethod.getInstance()
        }
    }
    override fun onStart() {
        super.onStart()
        val account = GoogleSignIn.getLastSignedInAccount(this)
        if(account!=null) {
            val intent = Intent(this@LoginActivity, DashboardActivity::class.java)
            startActivity(intent)
        }
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
        val httpUrl = "$baseUrl/client/login?email=$email&password=$password&type=$type"
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
                        val intent = Intent()
                        intent.putExtra("token", json.tokenCode)
                        intent.putExtra("login", 1)
                        setResult(RESULT_OK, intent)
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
    fun signIn() {
        Log.d("SIGNIN hello", "idkkkkkk")
        val intent = mGoogleSignInClient!!.signInIntent
        startActivityForResult(intent, RC_SIGN_IN)
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
    @SerializedName("name") val name : String,
    @SerializedName("lastName") val lastName : String,
    @SerializedName("email") val email : String,
    @SerializedName("type") val type : String,
)
