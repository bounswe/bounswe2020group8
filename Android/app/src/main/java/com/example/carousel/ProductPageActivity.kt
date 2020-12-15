package com.example.carousel

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MotionEvent
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_product_page.*


class ProductPageActivity : AppCompatActivity() {
    private var product: Product? = null
    private lateinit var adapter: CommentAdapter
    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_page)
        this.product = intent?.getSerializableExtra("product") as Product
        image.setImageResource(product!!.photoUrl)
        header.text = product!!.title
        price.text = "\$${product!!.price}"
        description.text = product!!.description
        vendor.text = "by ${product!!.vendorId}"
        product!!.comments.add(Comment("Very good", 5f, "Ahmet Zübüzüb","123"))
        product!!.comments.add(Comment("Very bad I had terrible experience with this product please delete this from this website.", 1f, "Tuba Engin","122"))
        rating.setOnTouchListener { v, event ->
            when (event?.action) {
                MotionEvent.ACTION_DOWN -> rating.rating = rating.rating
            }
            v?.onTouchEvent(event) ?: true
        }
        createCommentList(product!!.comments)
        updateReviews()
    }
    private fun createCommentList(commentList: ArrayList<Comment>){
        this.adapter = CommentAdapter(commentList)
        comments.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(this@ProductPageActivity.adapter)
        }
    }

    fun addReview(view: View){
        val comment = textInputEditText.text.toString()
        val rating = rating.rating
        val user = "Onur Enginer"
        val id = "12345"
        product!!.comments.add(Comment(comment, rating, user, id))
        adapter.notifyDataSetChanged()
        updateReviews()
    }
    fun cancel(view: View){
        textInputEditText.setText("")
    }
    private fun updateReviews(){
        textInputEditText.setText("")
        val newRating = adapter.getRating()
        overallRating.rating = newRating
        reviewsTitle.text = "Reviews (${product!!.comments.size})"
    }

}