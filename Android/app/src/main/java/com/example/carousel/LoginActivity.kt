package com.example.carousel

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.method.LinkMovementMethod
import android.util.Log
import android.view.View
import android.widget.RadioButton
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.RequestLogin
import com.example.carousel.pojo.ResponseLogin
import com.example.carousel.pojo.ResponseStandard
import com.github.razir.progressbutton.bindProgressButton
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_login.*
import okhttp3.*
import java.io.IOException


class LoginActivity : AppCompatActivity() {
    private val baseUrl = "http://18.198.51.178:8080"
    private val RC_SIGN_IN = 1
    private var mGoogleSignInClient: GoogleSignInClient? = null
    private val client = OkHttpClient()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)
        bindProgressButton(login_button)
        val gso =
            GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build()

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso)
        val google_signIn_btn =
            findViewById<com.google.android.gms.common.SignInButton>(R.id.sign_in_button)
        google_signIn_btn.setOnClickListener {
            signIn()
        }
        val forgotPasswordButton = findViewById<TextView>(R.id.forgotPassword)
        forgotPasswordButton.setOnClickListener {
            val intent = Intent(this, ForgotPasswordActivity::class.java)
            startActivity(intent)
            forgotPassword.movementMethod = LinkMovementMethod.getInstance()
        }
    }

    override fun onStart() {
        super.onStart()
        GoogleSignIn.getLastSignedInAccount(this)
        //if(account!=null) {

        //}
    }

    fun login(view: View) {
        val email = login_email.text.toString()
        val password = login_password.text.toString()
        val type: String
        when (findViewById<RadioButton>(R.id.radio_button_customer).isChecked) {
            true -> type = "CLIENT";
            false -> type = "VENDOR"
        }

        val apiCallerLogin: ApiCaller<ResponseLogin> = ApiCaller(this@LoginActivity)
        apiCallerLogin.Button = login_button
        apiCallerLogin.Caller = ApiClient.getClient.login(email, password)
        apiCallerLogin.Success = { it ->
            if (it != null) {
                this@LoginActivity.runOnUiThread(Runnable { //Handle UI here

                    val prefs =
                        getSharedPreferences("userInfo", Context.MODE_PRIVATE)
                    val editor = prefs.edit()
                    editor.putString("token", it.tokenCode)
                    editor.putBoolean("isAuthenticated", true)
                    editor.apply()
                    ApplicationContext.instance.authenticate(it.tokenCode)

                    val apiCallerGetUser: ApiCaller<ResponseStandard> = ApiCaller(this@LoginActivity)
                    apiCallerGetUser.Caller = ApiClient.getClient.customerMe()
                    apiCallerGetUser.Success = {
                        if (it != null) {
                            this@LoginActivity.runOnUiThread(Runnable { //Handle UI here


                                finish();
                            })
                        }
                    }
                    apiCallerGetUser.Failure = {}
                    apiCallerGetUser.run()
                    finish();
                })
            }
        }
        apiCallerLogin.Failure = {}
        apiCallerLogin.run()
    }

    private fun signInCall(email: String?, googleId: String?) {
        val postBody = FormBody.Builder().build()
        val httpUrl = "$baseUrl/client/loginWithGoogle?email=$email&googleId=$googleId"
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
                    Gson().fromJson(response.body?.string(), SignInWithGoogleJSON::class.java)
                val responseCode = response.code
                if (responseCode == 200) {
                    this@LoginActivity.runOnUiThread(Runnable { //Handle UI here
                        val intent = Intent()
                        intent.putExtra("token", json.tokenCode)
                        intent.putExtra("login", 1)
                        intent.putExtra(
                            "fullName",
                            "${json.client.name} ${json.client.lastName}"
                        )
                        setResult(RESULT_OK, intent)
                        finish();
                    })
                } else {
                    this@LoginActivity.runOnUiThread(Runnable {
                        Toast.makeText(
                            this@LoginActivity,
                            "Invalid email or password",
                            Toast.LENGTH_SHORT
                        ).show()
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
        val intent = mGoogleSignInClient!!.signInIntent
        startActivityForResult(intent, RC_SIGN_IN)

    }

    override fun onActivityResult(
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == RC_SIGN_IN) {
            val task =
                GoogleSignIn.getSignedInAccountFromIntent(data)

            try {
                val account: GoogleSignInAccount? = task.getResult(ApiException::class.java)
                signInCall(googleId = account!!.id, email = account.email)
            } catch (e: ApiException) {
                // The ApiException status code indicates the detailed failure reason.
                // Please refer to the GoogleSignInStatusCodes class reference for more information.
                Log.e("TAG", "signInResult:failed code=" + e.statusCode)
            }
        }
    }
}


