package com.example.carousel

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.TextView
import androidx.fragment.app.FragmentActivity
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.DataCustomerMe
import com.example.carousel.pojo.ExampleObject
import com.example.carousel.pojo.ResponseCustomerMe

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
        holder.deleteButton.setOnClickListener{
            deleteCard(position)
        }

        holder.editButton.setOnClickListener{
            val fragment = editCardFragment(position)
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_settings, fragment)
                ?.commit()
        }
    }

    private fun deleteCard(position: Int) {
        var id: String
        var name: String
        var lastName: String
        var email: String
        var isSuspended: Boolean
        var isActive: Boolean
        var shoppingLists: List<List<Product>>?
        var orders: List<ExampleObject>?
        var cart: List<ExampleObject>?
        var addresses: List<Address>?
        var telephoneNumber: String?
        var birthday: String?
        var creditCards: List<Card>?

        val apiCaller: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
        apiCaller.Caller = ApiClient.getClient.customerMe()
        apiCaller.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
                    id = it.data.id
                    name = it.data.name
                    lastName = it.data.lastName
                    email = it.data.email
                    isSuspended = it.data.isSuspended
                    isActive = it.data.isActive
                    shoppingLists = it.data.shoppingLists
                    orders = it.data.orders
                    cart = it.data.cart
                    addresses = it.data.addresses
                    telephoneNumber = it.data.telephoneNumber
                    birthday = it.data.birthday
                    creditCards = it.data.creditCards
                    var tempCreditCards = creditCards?.toMutableList()
                    if (tempCreditCards != null) {
                        tempCreditCards.removeAt(position)
                    }
                    creditCards = tempCreditCards?.toList()

                    var newData = DataCustomerMe(
                        id,
                        name,
                        lastName,
                        email,
                        isSuspended,
                        isActive,
                        shoppingLists,
                        orders,
                        cart,
                        addresses,
                        telephoneNumber,
                        birthday,
                        creditCards
                    )
                    val apiCallerPatch: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
                    apiCallerPatch.Caller = ApiClient.getClient.customerUpdate(newData)
                    apiCallerPatch.Success = { it ->
                        if (it != null) {
                            activity?.runOnUiThread(Runnable { //Handle UI here
                                val fragment = Settings()
                                activity?.supportFragmentManager?.beginTransaction()
                                    ?.replace(R.id.fragment_account_page, fragment)
                                    ?.commit()
                            })
                        }
                    }
                    apiCallerPatch.Failure = {}
                    apiCallerPatch.run()

                })
            }
        }
        apiCaller.Failure = {}
        apiCaller.run()
    }
}