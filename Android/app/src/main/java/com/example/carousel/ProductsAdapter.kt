package com.example.carousel

import android.app.Activity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.DataCustomerMe
import com.example.carousel.pojo.UpdateCart


class ProductsAdapter (    private var productList: ArrayList<Product> , private val activity: Activity) : RecyclerView.Adapter<ProductsAdapter.ViewHolder>(){
    var onItemClick: ((Product) -> Unit)? = null

    override fun getItemCount(): Int {
        return productList.size
    }

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val image: ImageView = itemView.findViewById(R.id.icon)
        val title: TextView = itemView.findViewById(R.id.title)
        val price: TextView = itemView.findViewById(R.id.price)
        val rating: RatingBar = itemView.findViewById(R.id.rating)
        val numberOfRatings: TextView = itemView.findViewById(R.id.numberOfRatings)
        val addToCartButton: Button = itemView.findViewById(R.id.addToCartButton)


            init {
                itemView.setOnClickListener {
                    onItemClick?.invoke(productList[adapterPosition])
                }
            }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.product_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        updateAppearance(holder, position)

        val imgUri = if (productList[position].photos.isNullOrEmpty())  R.mipmap.ic_no_image else productList[position].photos[0]
        Glide.with(holder.image)
            .load(imgUri)
            .into(holder.image)

        holder.title.text = productList[position].title
        holder.price.text = "\$${productList[position].price}"
        holder.rating.rating = productList[position].rating.toFloat()
        val numberOfRatingsText = productList[position].numberOfRatings.toString()
        holder.numberOfRatings.text = "($numberOfRatingsText)"
        holder.addToCartButton.setOnClickListener{
            val apiCallerAddToCart: ApiCaller<DataCustomerMe> = ApiCaller(activity)
            //apiCallerAddToCart.Button = addToCartButton
            apiCallerAddToCart.Caller = ApiClient.getClient.updateCart(UpdateCart( 1, productList[position]._id, productList[position].vendorId))
            apiCallerAddToCart.Success = { it ->
                if (it != null) {
                    this.productList[position].let { CartFragment.addToCart(it, 1) }
                    updateAppearance(holder, position)
                    //val color = holder.addToCartButton.context.getResources.getColor(R.color.successGreen)
                    //holder.addToCartButton.setBackgroundColor(0x3EA322)
                    Toast.makeText(activity,"Product Added to Cart", Toast.LENGTH_SHORT).show()

                }
            }
            apiCallerAddToCart.run()
            apiCallerAddToCart.Failure = { }
        }
    }
    fun replaceProducts(newProducts: ArrayList<Product>){
        this.productList = newProducts
    }
    fun updateAppearance(holder: ViewHolder, position: Int) {
        if(this.productList[position].isInCart) {
            holder.addToCartButton.setBackgroundColor(ContextCompat.getColor(activity, R.color.successGreen))
            holder.addToCartButton.setTextColor(ContextCompat.getColor(activity, R.color.colorWhite))
            holder.addToCartButton.text = "Added to Cart"
        }
        else {
            holder.addToCartButton.setBackgroundColor(ContextCompat.getColor(activity, R.color.colorWhite))
            holder.addToCartButton.setTextColor(ContextCompat.getColor(activity, R.color.black_text_color))
            holder.addToCartButton.text = "Add to Cart"
        }
    }
}

