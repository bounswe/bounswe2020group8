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
    var Caller: Call<ResponseBody>?
    lateinit var Success: (response: T) -> Unit
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
        var gson = Gson()
        animateButton()
        Caller?.enqueue(object : Callback<ResponseBody> {
            override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {
                if (response.code() == 200) {
                    try {
                        val data: T = response.body()?.source() as T
                        Success(data)
                    } catch (e: JSONException) {
                        e.printStackTrace()
                    }
                } else if (response.code() == 400) {
                    if (!response.isSuccessful) {

                        try {
                            var testModel = gson.fromJson(response.errorBody()?.string(), ResponseError::class.java)
                            Alerter.create(TargetActivity)
                                .setTitle(
                                    TargetActivity?.getString(R.string.alert_error_title).toString()
                                )
                                .setText(testModel.returnMessage)
                                .setBackgroundColorRes(R.color.errorRed)
                                .show()
                        } catch (e: JSONException) {
                            e.printStackTrace()
                        }
                    }

                }
                revertAnimation()

            }

            override fun onFailure(call: Call<ResponseBody>?, t: Throwable?) {
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