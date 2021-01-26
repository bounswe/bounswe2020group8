package com.example.carousel.vendor

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import com.bumptech.glide.Glide
import com.example.carousel.R
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.*
import kotlinx.android.synthetic.main.activity_vendor_order.*
import kotlinx.android.synthetic.main.activity_vendor_order.status
import kotlinx.android.synthetic.main.fragment_vendor_orders.*

class VendorOrderActivity : AppCompatActivity(), AdapterView.OnItemSelectedListener {
    private var order: VendorOrder? = null


    @SuppressLint("ClickableViewAccessibility")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_vendor_order)

        val statusArray = resources.getStringArray(R.array.Status)
        val adapter = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_item, statusArray
        )
        statusSpinner.adapter = adapter



        this.order = intent?.getSerializableExtra("order") as VendorOrder
        //image.setImageResource(product!!.photoUrl)
        val imgUri =
            if (order!!.product!!.data.photos.isNullOrEmpty()) R.mipmap.ic_no_image else order!!.product!!.data.photos[0]
        Glide.with(image)
            .load(imgUri)
            .into(image)
        header.text = order!!.productName
        price.text = "\$${order!!.price}"

        val parameterText: String = ""

        for (parameter in order!!.product!!.data.parameters) {
            if (productParameters.text == "")
                productParameters.text = "${parameter.name}: ${parameter.value}"
            else
                productParameters.text =
                    "${productParameters.text}\n${parameter.name}: ${parameter.value}"
        }

        orderAmount.text = "${order!!.amount}"

        customerName.text = "${order!!.customerName} ${order!!.customerSurname}"

        shippingAddress.text =
            "${order!!.shippingAddress.addressLine} ${order!!.shippingAddress.city} ${order!!.shippingAddress.zipCode}"

        if (order!!.status == "being prepared") {
            statusSpinner.setSelection(0)
            status.text = statusArray[0]
        } else if (order!!.status == "on the way") {
            statusSpinner.setSelection(1)
            status.text = statusArray[1]
        } else if (order!!.status == "delivered") {
            statusSpinner.setSelection(2)
            status.text = statusArray[2]
        } else if (order!!.status == "cancelled by the customer") {
            statusSpinner.visibility = View.INVISIBLE
            status.text = statusArray[3]
        } else {

        }

        statusSpinner.onItemSelectedListener = object :
            AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>,
                view: View, position: Int, id: Long
            ) {

                if (order!!.status != statusArray[position].toLowerCase()){
                    var selectedStatus = ""
                    if (position == 0) {
                        selectedStatus = "being prepared"
                    } else if (position == 1) {
                        selectedStatus = "on the way"
                    } else if (position == 2) {
                        selectedStatus = "delivered"
                    } else {

                    }

                    val request =
                        RequestSetStatus(
                            mainOrderID = order!!.mainOrderId,
                            orderID = order!!._id,
                            status = selectedStatus
                        )

                    val apiCallerSetStatus: ApiCaller<VendorOrderData> =
                        ApiCaller(this@VendorOrderActivity)
                    apiCallerSetStatus.Caller =
                        ApiClient.getClient.setStatus(request)
                    apiCallerSetStatus.Success = { mainProduct ->

                        if (selectedStatus == "being prepared") {
                            order!!.status = "being prepared"
                            status.text = statusArray[0]
                        } else if (selectedStatus == "on the way") {
                            order!!.status = "on the way"
                            status.text = statusArray[1]
                        } else if (selectedStatus == "delivered") {
                            order!!.status = "delivered"
                            status.text = statusArray[2]
                        } else {

                        }
                    }
                    apiCallerSetStatus.Failure = {
                        Log.d("setOrder", "fail")
                    }
                    apiCallerSetStatus.run()
                }
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                // write code to perform some action
            }
        }

    }

    override fun onNothingSelected(parent: AdapterView<*>?) {
        TODO("Not yet implemented")
    }

    override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
        TODO("Not yet implemented")
    }

}