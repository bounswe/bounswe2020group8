package com.example.carousel

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class CartAdapter (    private var productList: ArrayList<Product>) : RecyclerView.Adapter<CartAdapter.ViewHolder>(){
    var onItemClick: ((Product) -> Unit)? = null
    override fun getItemCount(): Int {
        return productList.size
    }

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val image: ImageView = itemView.findViewById(R.id.icon)
        val title: TextView = itemView.findViewById(R.id.title)
        val price: TextView = itemView.findViewById(R.id.price)
        val remove: Button = itemView.findViewById(R.id.remove_product)

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(productList[adapterPosition])
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.product_cart_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.image.setImageResource(productList[position].photoUrl)
        holder.title.text = productList[position].title
        holder.price.text = "\$${productList[position].price}"
        holder.remove.setOnClickListener{
            CartFragment.removeFromCart(position)
            this.notifyDataSetChanged()
        }

    }
    fun totalCost(): Double{
        var sum : Double = 0.0
        for(product in productList){
            sum+=product.price
        }
        return sum
    }
}

