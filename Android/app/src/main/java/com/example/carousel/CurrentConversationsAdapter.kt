package com.example.carousel

import android.content.Intent

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.pojo.DataTicket


class CurrentConversationsAdapter (private var userList: ArrayList<DataTicket> ) : RecyclerView.Adapter<CurrentConversationsAdapter.ViewHolder>(){
    var onItemClick: ((DataTicket) -> Unit)? = null

    override fun getItemCount(): Int {
        return userList.size
    }

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val title: TextView = itemView.findViewById(R.id.title)
        val lastMessage: TextView = itemView.findViewById(R.id.body)

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(userList[adapterPosition])
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.conversation_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.title.text = userList[position].topic
        holder.lastMessage.text = userList[position].conversation[userList[position].conversation.size-1].payload
    }
}

