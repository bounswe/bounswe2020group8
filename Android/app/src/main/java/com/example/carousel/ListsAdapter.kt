package com.example.carousel

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class ListsAdapter (    private var productList: ArrayList<Product>) : RecyclerView.Adapter<ListsAdapter.ViewHolder>(){
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
        val view = LayoutInflater.from(parent.context).inflate(R.layout.product_list_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.image.setImageResource(productList[position].photoUrl)
        holder.title.text = productList[position].title
        holder.price.text = "\$${productList[position].price}"
        holder.remove.setOnClickListener{
            ShoppingListFragment.removeFromList(position)
            this.notifyDataSetChanged()
        }

    }
    fun replaceProducts(newProducts: ArrayList<Product>){
        this.productList = newProducts
    }
}

