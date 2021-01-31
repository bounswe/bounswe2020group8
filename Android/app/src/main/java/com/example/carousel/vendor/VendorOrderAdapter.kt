package com.example.carousel.vendor

import android.app.Activity
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

class VendorOrderAdapter(private var orderList: ArrayList<VendorOrder>, private val activity: Activity) :
    RecyclerView.Adapter<VendorOrderAdapter.ViewHolder>() {
    var onItemClick: ((VendorOrder) -> Unit)? = null

    override fun getItemCount(): Int {
        return orderList.size
    }

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val amount: TextView = itemView.findViewById(R.id.orderAmount)
        val customerName: TextView = itemView.findViewById(R.id.customerName)
        val productName: TextView = itemView.findViewById(R.id.productName)
        val status: TextView = itemView.findViewById(R.id.status)
        val orderId: TextView = itemView.findViewById(R.id.orderId)

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(orderList[adapterPosition])
            }

        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.vendor_order_view, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {


        holder.amount.text = orderList[position].amount.toString()
        holder.customerName.text = "${orderList[position].customerName} ${orderList[position].customerSurname}"
        holder.productName.text = orderList[position].productName
        holder.status.text = orderList[position].status
        holder.orderId.text = orderList[position]._id
    }

    fun replaceProducts(newOrders: ArrayList<VendorOrder>) {
        this.orderList = newOrders
    }
}
