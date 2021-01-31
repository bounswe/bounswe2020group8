package com.example.carousel

import android.os.Bundle
import android.text.method.ScrollingMovementMethod
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_sales_agreement.*


class SalesAgreementActivity  : AppCompatActivity()  {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sales_agreement)
        text_view.setMovementMethod(ScrollingMovementMethod())
    }

}
