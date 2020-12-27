package com.example.carousel

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide

class CartAdapter (    private var productList: ArrayList<Pair<Product,Int>>) : RecyclerView.Adapter<CartAdapter.ViewHolder>(){
    var onItemClick: ((Product) -> Unit)? = null
    override fun getItemCount(): Int {
        return productList.size
    }

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val image: ImageView = itemView.findViewById(R.id.icon)
        val title: TextView = itemView.findViewById(R.id.title)
        val price: TextView = itemView.findViewById(R.id.price)
        val remove: Button = itemView.findViewById(R.id.remove_product)
        val number: TextView = itemView.findViewById(R.id.number)

        val addFavorite: ToggleButton = itemView.findViewById(R.id.favourite_product)
        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(productList[adapterPosition].first)
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.product_cart_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val imgUri = if (productList[position].first.photos.isNullOrEmpty())  R.mipmap.ic_no_image else productList[position].first.photos[0]
        Glide.with(holder.image)
            .load(imgUri)
            .into(holder.image)
        holder.number.text = "x${productList[position].second}"
        holder.title.text = productList[position].first.title
        holder.price.text = "\$${String.format("%.2f",(productList[position].first.price*productList[position].second))}"
        holder.remove.setOnClickListener{
            CartFragment.removeFromCart(position)
            this.notifyDataSetChanged()
        }
        holder.addFavorite.setOnClickListener{
            //ShoppingListFragment.lists[0].add(productList[position])
        }
    }
    fun totalCost(): Double{
        var sum : Double = 0.0
        for(product in productList){
            sum+= (product.first.price*product.second)
        }
        return sum
    }
}

