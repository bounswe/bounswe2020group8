package com.example.carousel

import android.app.Activity
import androidx.fragment.app.FragmentActivity
import com.tapadoo.alerter.*

class FormValidator {
    var errors: MutableList<String>
    var targetActivity: Activity?

    constructor(activity: Activity?) {
        errors = mutableListOf<String>()
        targetActivity = activity
    }
    constructor(activity: FragmentActivity?) {
        errors = mutableListOf<String>()
        targetActivity = activity as Activity
    }

    fun AddCondition(condition: Boolean, message: String) {

        if (condition) {
            errors.add(message)
        }
    }

    fun RunIfValid(function: () -> (Unit)) {
        if (errors.count() == 0) {
            function()
        } else {
            Alerter.create(targetActivity)
                .setTitle(targetActivity?.getString(R.string.alert_error_title).toString())
                .setText(errors.joinToString("\n"))
                .setBackgroundColorRes(R.color.errorRed)
                .show()
        }
    }

}