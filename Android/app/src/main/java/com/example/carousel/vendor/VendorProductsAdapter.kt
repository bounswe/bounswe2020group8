package com.example.carousel.vendor


import android.app.Activity
import android.content.Intent
import android.util.Log

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.carousel.R
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.RequestProductAmountUpdate
import com.example.carousel.pojo.ResponseMainProduct
import com.example.carousel.pojo.ResponseProduct
import com.tapadoo.alerter.Alerter
import kotlinx.android.synthetic.main.fragment_vendor_home.*


class VendorProductsAdapter(
    private var productList: ArrayList<VendorProduct>,
    private val activity: Activity
) :
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
        val updateAmount: EditText = itemView.findViewById(R.id.updateAmount)
        val updateButton: Button = itemView.findViewById(R.id.updateAmountButton)

        init {
            itemView.setOnClickListener {
                onItemClick?.invoke(productList[adapterPosition])
            }
            updateButton.setOnClickListener {
                val request = RequestProductAmountUpdate(
                    productList[adapterPosition].vendorId,
                    productList[adapterPosition].price,
                    updateAmount.text.toString().toInt(),
                    productList[adapterPosition].shipmentPrice,
                    productList[adapterPosition].cargoCompany
                )
                val apiCallerSetAmount: ApiCaller<ResponseProduct> = ApiCaller(activity)
                apiCallerSetAmount.Caller =
                    ApiClient.getClient.productAmountUpdate(
                        productList[adapterPosition]._id,
                        productList[adapterPosition].vendorId,
                        request
                    )
                apiCallerSetAmount.Success = { it ->
                    updateAmount.setText("")
                    Alerter.create(activity)
                        .setTitle("Success")
                        .setText("Stock update request is sent.")
                        .setBackgroundColorRes(R.color.successGreen)
                        .show()
                }
                apiCallerSetAmount.Failure = { Log.d("SECONDRESPONSE", "FAILED") }
                apiCallerSetAmount.run()
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view =
            LayoutInflater.from(parent.context).inflate(R.layout.vendor_product_view, parent, false)
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
