package com.example.carousel

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.MotionEvent
import android.view.View
import android.view.WindowManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.*
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.synnapps.carouselview.ImageListener
import kotlinx.android.synthetic.main.activity_product_page.*


class ProductPageActivity : AppCompatActivity() {
    private var product: Product? = null
    private var count = 0
    //private var commentList: ArrayList<Comment> = ArrayList<Comment>()
    private lateinit var adapter: CommentAdapter
    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_page)

        // prevent the keyboard from opening
        this.window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN)

        var commentList: ArrayList<Comment> = ArrayList<Comment>()
        val recommendedProducts = ArrayList<Product>()
        this.product = intent?.getSerializableExtra("product") as Product
        //val imgUri = if (product!!.photos.isNullOrEmpty())  R.mipmap.ic_no_image else product!!.photos[0]
        //Glide.with(image)
            //.load(imgUri)
            //.into(image)
        val imageListener =
            ImageListener { position, imageView -> Glide.with(imageView).load(product!!.photos[position]).into(imageView) }
        carouselView.setImageListener(imageListener)
        carouselView.pageCount = product!!.photos.size
        header.text = product!!.title
        price.text = "\$${product!!.price}"
        description.text = product!!.description
        vendor.text = "by ${product!!.companyName}"
        //product!!.comments.add(Comment("Very good", 5.0, "Ahmet Zübüzüb","123"))
        //product!!.comments.add(Comment("Very bad I had terrible experience with this product please delete this from this website.", 1.0, "Tuba Engin","122"))
       this.runOnUiThread {

            val apiCallerGetComments: ApiCaller<ResponseGetComments> = ApiCaller(this)
            apiCallerGetComments.Caller = ApiClient.getClient.getComments(product!!.mainProductId)
            apiCallerGetComments.Success = { it ->
                if (it != null) {
                    commentList = it.data
                    createCommentList(commentList)
                    updateReviews()

                }
            }
            apiCallerGetComments.run()
            apiCallerGetComments.Failure = { }

           val apiCallerRecommendations: ApiCaller<ResponseProductSearch> = ApiCaller(this)
           apiCallerRecommendations.Caller = ApiClient.getClient.productRecommendations(product!!._id)
           apiCallerRecommendations.Success = { it ->
               if (it != null) {
                   for(product in it.data) {
                       recommendedProducts.add(
                           responseToProductSearch(
                               product,
                               product.mainProduct[0]
                           )
                       )
                   }
                   if(it.data.isEmpty()) {
                       recommendations_title.visibility = View.INVISIBLE
                       recommendations.visibility = View.INVISIBLE
                   }
                   else {
                       recommendations_title.visibility = View.VISIBLE
                       recommendations.visibility = View.VISIBLE
                   }
                   createProductList(recommendedProducts, recommendations)
               }
           }
           apiCallerRecommendations.run()
           apiCallerRecommendations.Failure = { }
        }
        rating.setOnTouchListener { v, event ->
            when (event?.action) {
                MotionEvent.ACTION_DOWN -> rating.rating = rating.rating
            }
            v?.onTouchEvent(event) ?: true
        }

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
            if(requestCode == 12 && data.getBooleanExtra("isCreated", false)){
                this.product?.let { com.example.carousel.ShoppingListFragment.addToList(
                    ShoppingListFragment.lists.lastIndex,
                    it
                ) }
                android.widget.Toast.makeText(this, "Product Added to List", android.widget.Toast.LENGTH_SHORT).show()
            }

        }
    }
    fun addReview(view: View){
        val comment = textInputEditText.text.toString()
        val rating = rating.rating.toInt()
        val user = "${LoginActivity.user.name} ${LoginActivity.user.lastName}"
        val id = LoginActivity.user.id
        //product!!.comments.add(Comment(comment, rating, user, id))
        this.runOnUiThread {

            val apiCallerPostComment: ApiCaller<PostComment> = ApiCaller(this)
            apiCallerPostComment.Caller = ApiClient.getClient.addComment(product!!.mainProductId, PostComment(comment, rating))
            apiCallerPostComment.Success = { it ->
                if (it != null) {
                    this.runOnUiThread {

                        val apiCallerGetComments: ApiCaller<ResponseGetComments> = ApiCaller(this)
                        apiCallerGetComments.Caller = ApiClient.getClient.getComments(product!!.mainProductId)
                        apiCallerGetComments.Success = { it ->
                            if (it != null) {
                                adapter.commentList = it.data
                                adapter.notifyDataSetChanged()
                                updateReviews()
                            }
                        }
                        apiCallerGetComments.run()
                        apiCallerGetComments.Failure = {}

                    }
                    //commentList.add(Comment(product!!._id, id, comment))
                }
            }
            apiCallerPostComment.run()
            apiCallerPostComment.Failure = { }

        }
    }
    fun cancel(view: View){
        textInputEditText.setText("")
    }
    private fun updateReviews(){
        textInputEditText.setText("")
        val newRating = product?.rating
        overallRating.rating = newRating?.toFloat()!!
        reviewsTitle.text = "Reviews (${adapter.commentList.size})"
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
                    android.widget.Toast.makeText(this, "Product Added to List", android.widget.Toast.LENGTH_SHORT).show()
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
            this.runOnUiThread {

                val apiCallerAddToCart: ApiCaller<DataCustomerMe> = ApiCaller(this)
                apiCallerAddToCart.Button = cart_button

                apiCallerAddToCart.Caller = ApiClient.getClient.updateCart(
                    UpdateCart(
                        count,
                        product!!._id,
                        product!!.vendorId
                    )
                )
                apiCallerAddToCart.Success = { it ->
                    if (it != null) {
                        this.product?.let { CartFragment.addToCart(it, count) }
                        this.product?.isInCart = true
                        Toast.makeText(this, "Product Added to Cart", Toast.LENGTH_SHORT).show()

                    }
                }
                apiCallerAddToCart.run()
                apiCallerAddToCart.Failure = { }
            }

        }
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


    private fun createProductList(products: ArrayList<Product>, recyclerId: RecyclerView){
        val adapter = ProductsAdapter(products, this)
        recyclerId.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.HORIZONTAL ,false)
            setAdapter(adapter)
        }
        adapter.onItemClick = { product ->
            val intent = Intent(this, ProductPageActivity::class.java)
            intent.putExtra("product",product)
            startActivity(intent)
        }
    }

}
