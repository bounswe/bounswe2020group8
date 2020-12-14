package com.example.carousel.map

import android.app.Activity
import android.graphics.Color
import android.widget.TextView
import androidx.fragment.app.FragmentActivity
import com.example.carousel.R
import com.example.carousel.pojo.ResponseError
import com.github.razir.progressbutton.attachTextChangeAnimator
import com.github.razir.progressbutton.hideProgress
import com.github.razir.progressbutton.showProgress
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.tapadoo.alerter.Alerter
import okhttp3.ResponseBody
import org.json.JSONException
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class ApiCaller<T : Any> {
    var ButtonLoadingTextRes: Int?
    var Button: TextView?
    var Caller: Call<T>?
    lateinit var Success: (response: T?) -> Unit
    lateinit var Failure: () -> Unit

    private lateinit var oldButtonText: String

    var TargetActivity: Activity?

    constructor(activity: Activity?) {
        TargetActivity = activity
        Caller = null
        Button = null
        ButtonLoadingTextRes = null
    }


    constructor(activity: FragmentActivity?) {
        TargetActivity = activity as Activity
        Caller = null
        Button = null
        ButtonLoadingTextRes = null
    }


    fun run() {

        animateButton()
        Caller?.enqueue(object : Callback<T> {

            override fun onResponse(call: Call<T>?, response: Response<T>?) {
                if (response?.body() != null) {
                    Success(response.body())
                } else if (response?.errorBody() != null) {
                    val gson = Gson()
                    val type = object : TypeToken<ResponseError>() {}.type
                    val error: ResponseError? = gson.fromJson(response.errorBody()!!.charStream(), type)

                    Alerter.create(TargetActivity)
                        .setTitle(TargetActivity?.getString(R.string.alert_error_title).toString())
                        .setText(error!!.returnMessage)
                        .setBackgroundColorRes(R.color.errorRed)
                        .show()
                }
                revertAnimation()
            }


            override fun onFailure(call: Call<T>?, t: Throwable?) {
                Failure()

                revertAnimation()
                Alerter.create(TargetActivity)
                    .setTitle(TargetActivity?.getString(R.string.alert_error_title).toString())
                    .setText(R.string.api_error)
                    .setBackgroundColorRes(R.color.errorRed)
                    .show()
            }
        })
    }

    private fun revertAnimation() {
        if (Button != null) {
            Button?.isClickable = true
            Button?.hideProgress(oldButtonText)
        }
    }

    private fun animateButton() {
        if (Button != null) {
            Button?.isClickable = false
            oldButtonText = Button?.text.toString()
            Button?.attachTextChangeAnimator()
            Button?.showProgress {
                buttonTextRes =
                    if (ButtonLoadingTextRes != null) ButtonLoadingTextRes else R.string.submitting
                progressColor = Color.WHITE
            }
        }
    }
}