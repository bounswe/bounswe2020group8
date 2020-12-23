package com.example.carousel

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.view.View
import android.widget.Toast
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.carousel.application.ApplicationContext
import com.google.android.material.dialog.MaterialAlertDialogBuilder
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

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (data != null) {
            if(requestCode == 12 && data.getBooleanExtra("isCreated",false)){
                this.product?.let { com.example.carousel.ShoppingListFragment.addToList(ShoppingListFragment.lists.lastIndex, it) }
                android.widget.Toast.makeText(this,"Product Added to List", android.widget.Toast.LENGTH_SHORT).show()
            }

        }
    }
    fun addReview(view: View){
        val comment = textInputEditText.text.toString()
        val rating = rating.rating
        val user = "${LoginActivity.user.name} ${LoginActivity.user.lastName}"
        //val id = LoginActivity.user._id
        val id = LoginActivity.user.id
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
    fun addToList(view: View){
        val items = ShoppingListFragment.ShoppingList.listNames.toMutableList()
        items.add("Create A New List")
        var checkedItem = 0

        MaterialAlertDialogBuilder(this)
            .setTitle(resources.getString(R.string.list))
            .setNeutralButton(resources.getString(R.string.cancel)) { dialog, which ->
                // Respond to neutral button press

            }
            .setPositiveButton(resources.getString(R.string.select)) { dialog, which ->
                // Respond to positive button press
                if(checkedItem == items.lastIndex) {
                    val intent = Intent(this, CreateListActivity::class.java)
                    startActivityForResult(intent, 12)
                }
                else{
                    this.product?.let { com.example.carousel.ShoppingListFragment.addToList(checkedItem, it) }
                    android.widget.Toast.makeText(this,"Product Added to List", android.widget.Toast.LENGTH_SHORT).show()
                }

            }
            // Single-choice items (initialized with checked item)
            .setSingleChoiceItems(items.toTypedArray(), checkedItem) { dialog, which ->
                checkedItem=which

                // Respond to item chosen
            }

            .show()


    }
    fun addToCart(view: View){
        if (!ApplicationContext.instance.isUserAuthenticated()) {
            val intent = Intent(this, LoginActivity::class.java)
            startActivity(intent)
        }
        else {
            this.product?.let { CartFragment.addToCart(it) }
            Toast.makeText(this,"Product Added to Cart", Toast.LENGTH_SHORT).show()
        }
    }



}