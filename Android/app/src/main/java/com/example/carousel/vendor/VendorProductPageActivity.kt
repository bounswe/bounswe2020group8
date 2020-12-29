package com.example.carousel.vendor

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.view.View
import android.view.View.INVISIBLE
import android.widget.Toast
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.example.carousel.Comment
import com.example.carousel.CommentAdapter
import com.example.carousel.R
import com.example.carousel.application.ApplicationContext
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import kotlinx.android.synthetic.main.activity_product_page.*
import kotlinx.android.synthetic.main.fragment_acount_page.view.*


class VendorProductPageActivity : AppCompatActivity() {
    private var product: VendorProduct? = null
    private var count = 0
    private lateinit var adapter: CommentAdapter
    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.vendor_activity_product_page)
        this.product = intent?.getSerializableExtra("product") as VendorProduct
        //image.setImageResource(product!!.photoUrl)
        val imgUri = if (product!!.photos.isNullOrEmpty())  R.mipmap.ic_no_image else product!!.photos[0]
        Glide.with(image)
            .load(imgUri)
            .into(image)
        header.text = product!!.title
        price.text = "\$${product!!.price}"
        description.text = product!!.description
        vendor.text = "by ${product!!.vendorId}"
        //product!!.comments.add(Comment("Very good", 5f, "Ahmet Zübüzüb","123"))
        //product!!.comments.add(Comment("Very bad I had terrible experience with this product please delete this from this website.", 1f, "Tuba Engin","122"))

        createCommentList(product!!.comments)


    }
    private fun createCommentList(commentList: ArrayList<Comment>){
        this.adapter = CommentAdapter(commentList)
        comments.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(this@VendorProductPageActivity.adapter)
        }
    }

    fun cancel(view: View){
        textInputEditText.setText("")
    }


    fun incCount(view: View){
        count++
        counter.setText(count.toString())
    }
    fun decCount(view: View){
        if(count>0) {
            count--
            counter.setText(count.toString())
        }
    }

}