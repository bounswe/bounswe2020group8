package com.example.carousel.vendor


import android.app.Activity
import android.content.Intent
import android.util.Log

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.carousel.R


class VendorProductsAdapter(private var productList: ArrayList<VendorProduct>, private val activity: Activity) :
    RecyclerView.Adapter<VendorProductsAdapter.ViewHolder>() {
    var onItemClick: ((VendorProduct) -> Unit)? = null

    override fun getItemCount(): Int {
        return productList.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val image: ImageView = itemView.findViewById(R.id.icon)
        val title: TextView = itemView.findViewById(R.id.title)
        val price: TextView = itemView.findViewById(R.id.price)
        val amountLeft: TextView = itemView.findViewById(R.id.amountLeft)
        val updateButton: Button = itemView.findViewById(R.id.updateAmountButton)

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(productList[adapterPosition])
            }
            updateButton.setOnClickListener {
                Log.d("successorospucocugu", it.toString())
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.vendor_product_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        val imgUri =
            if (productList[position].photos.isNullOrEmpty()) R.mipmap.ic_no_image else productList[position].photos[0]
        Glide.with(holder.image)
            .load(imgUri)
            .into(holder.image)

        holder.title.text = productList[position].title
        holder.price.text = "\$${productList[position].price}"
        holder.amountLeft.text = productList[position].amountLeft.toString()
    }

    fun replaceProducts(newProducts: ArrayList<VendorProduct>) {
        this.productList = newProducts
    }
}
