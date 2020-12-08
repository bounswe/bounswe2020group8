package com.example.carousel

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_product_page.*


class ProductPageActivity : AppCompatActivity() {
    var product: Product? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_page)
        this.product = intent?.getSerializableExtra("product") as Product
        image.setImageResource(product!!.photoUrl)
        header.text = product!!.title
        price.text = "\$${product!!.price}"
    }
}