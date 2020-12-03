package com.example.carousel

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log

class ProductPageActivity : AppCompatActivity() {
    var id = 0;
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_page)
        id = intent?.getIntExtra("id",0)!!
    }
}