package com.example.carousel

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.activity_product_page.*


class ProductPageActivity : AppCompatActivity() {
    private var product: Product? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_page)
        this.product = intent?.getSerializableExtra("product") as Product
        image.setImageResource(product!!.photoUrl)
        header.text = product!!.title
        price.text = "\$${product!!.price}"
        description.text = product!!.description

        product!!.comments
    }
    private fun createCommentList(commentList: ArrayList<Comment>){
        val adapter = CommentAdapter(commentList)
        comments.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.HORIZONTAL, false)
            setAdapter(adapter)
        }
    }
}