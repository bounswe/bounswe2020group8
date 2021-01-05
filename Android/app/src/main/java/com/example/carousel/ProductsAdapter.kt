package com.example.carousel

import android.content.Intent

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide


class ProductsAdapter (    private var productList: ArrayList<Product> ) : RecyclerView.Adapter<ProductsAdapter.ViewHolder>(){
    var onItemClick: ((Product) -> Unit)? = null

    override fun getItemCount(): Int {
        return productList.size
    }

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val image: ImageView = itemView.findViewById(R.id.icon)
        val title: TextView = itemView.findViewById(R.id.title)
        val price: TextView = itemView.findViewById(R.id.price)

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

        val imgUri = if (productList[position].photos.isNullOrEmpty())  R.mipmap.ic_no_image else productList[position].photos[0]
        Glide.with(holder.image)
            .load(imgUri)
            .into(holder.image)

        holder.title.text = productList[position].title
        holder.price.text = "\$${productList[position].price}"
    }
    fun replaceProducts(newProducts: ArrayList<Product>){
        this.productList = newProducts
    }
}

