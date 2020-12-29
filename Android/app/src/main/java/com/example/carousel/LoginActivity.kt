package com.example.carousel

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.text.method.LinkMovementMethod
import android.util.Log
import android.view.View
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.carousel.application.ApplicationContext
import com.example.carousel.customer.RegisterInfoActivity
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.*
import com.example.carousel.vendor.VendorLoginActivity
import com.github.razir.progressbutton.bindProgressButton
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import kotlinx.android.synthetic.main.activity_login.*
import okhttp3.*


class LoginActivity : AppCompatActivity() {

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
        vendor.setOnClickListener {
            val intent = Intent(this, VendorLoginActivity::class.java)
            startActivityForResult(intent, 123)
            vendor.movementMethod = LinkMovementMethod.getInstance()
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

        val validationContainer: FormValidator = FormValidator(this@LoginActivity)
        validationContainer.AddCondition(login_email.text.isEmpty(), "Email is required")
        validationContainer.AddCondition(login_password.text.isEmpty(), "Password is required")
        validationContainer.RunIfValid {

            val apiCallerLogin: ApiCaller<ResponseLogin> = ApiCaller(this@LoginActivity)
            apiCallerLogin.Button = login_button
            apiCallerLogin.Caller = ApiClient.getClient.customerLogin(email, password)
            apiCallerLogin.Success = { it ->
                if (it != null) {
                    this@LoginActivity.runOnUiThread(Runnable { //Handle UI here

                        val prefs =
                            getSharedPreferences("userInfo", Context.MODE_PRIVATE)
                        val editor = prefs.edit()
                        editor.putString("token", it.tokenCode)
                        editor.putBoolean("isAuthenticated", true)
                        editor.putString("type", "CLIENT")
                        editor.apply()
                        ApplicationContext.instance.authenticate(it.tokenCode, "CLIENT")
                        finish()
                    })
                }
            }
            apiCallerLogin.Failure = {}
            apiCallerLogin.run()
        }
    }

    private fun signInCall(email: String?, googleId: String?) {

        val apiCallerSignIn: ApiCaller<ResponseLogin> = ApiCaller(this@LoginActivity)
        apiCallerSignIn.Button = login_button
        apiCallerSignIn.Caller = ApiClient.getClient.signIn(email!!, googleId!!)
        apiCallerSignIn.Success = { it ->
            if (it != null) {
                this@LoginActivity.runOnUiThread(Runnable { //Handle UI here

                    val prefs =
                        getSharedPreferences("userInfo", Context.MODE_PRIVATE)
                    val editor = prefs.edit()
                    editor.putString("token", it.tokenCode)
                    editor.putBoolean("isAuthenticated", true)
                    editor.putString("type", "CLIENT")
                    editor.apply()
                    ApplicationContext.instance.authenticate(it.tokenCode,  "CLIENT")
                    finish();
                })
            }
        }
        apiCallerSignIn.Failure = {}
        apiCallerSignIn.run()

    }

    fun signup(view: View) {
        val intent = Intent(this, RegisterInfoActivity::class.java)
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
        } else if (requestCode == 123) {
            if (resultCode == Activity.RESULT_OK) {
                val returnIntent = Intent()
                setResult(Activity.RESULT_OK, returnIntent)
                finish()
            }
        }
    }
    companion object User {
        lateinit var user: DataCustomerMe
        fun isInit() : Boolean{
            return this::user.isInitialized
        }
    }
}


