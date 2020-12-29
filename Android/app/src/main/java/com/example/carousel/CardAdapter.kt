package com.example.carousel

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.TextView
import androidx.fragment.app.FragmentActivity
import androidx.recyclerview.widget.RecyclerView

class CardAdapter(
    private var cardList: ArrayList<Card>,
    var activity: FragmentActivity) : RecyclerView.Adapter<CardAdapter.ViewHolder>(){

    var onItemClick: ((Card) -> Unit)? = null

    override fun getItemCount(): Int {
        return cardList.size
    }

    inner class ViewHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        val cardName: TextView = itemView.findViewById(R.id.profile_card_name)
        val editButton: ImageButton = itemView.findViewById(R.id.edit_button)
        val deleteButton: ImageButton = itemView.findViewById(R.id.delete_button)

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(cardList[adapterPosition])
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.card_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: CardAdapter.ViewHolder, position: Int) {
        val temp = cardList[position].creditCardNumber
        holder.cardName.text = "**** **** **** "+temp.subSequence(temp.length-4,temp.length)
    }

}