package com.example.carousel

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RatingBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class CommentAdapter (    private val commentList: ArrayList<Comment> ) : RecyclerView.Adapter<CommentAdapter.ViewHolder>(){

    override fun getItemCount(): Int {
        return commentList.size
    }

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val username: TextView = itemView.findViewById(R.id.comment_owner)
        val rating: RatingBar = itemView.findViewById(R.id.rating)
        val body: TextView = itemView.findViewById(R.id.body)

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.comment_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.username.text = commentList[position].ownerID
        holder.rating.rating = commentList[position].rating
        holder.body.text = commentList[position].body

    }
    fun getRating(): Float{
        var sum = 0f
        for(item in commentList){
            sum+= item.rating
        }
        return sum/commentList.size
    }
}