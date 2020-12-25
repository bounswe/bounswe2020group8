package com.example.carousel

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class CategoriesAdapter (private var categoryList: ArrayList<Category>) : RecyclerView.Adapter<CategoriesAdapter.ViewHolder>(){
    var onItemClick: ((Category) -> Unit)? = null

    override fun getItemCount(): Int {
        return categoryList.size
    }

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val title: TextView = itemView.findViewById(R.id.title)
        val container: LinearLayout = itemView.findViewById(R.id.container)

        init {
                itemView.setOnClickListener {
                    onItemClick?.invoke(categoryList[adapterPosition])
                }
            }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.category_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.title.text = categoryList[position].title
        holder.container.setBackgroundResource(categoryList[position].photoUrl)
    }
}

