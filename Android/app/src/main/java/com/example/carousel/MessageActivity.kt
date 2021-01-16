package com.example.carousel

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.carousel.pojo.VendorSpecifics
import com.xwray.groupie.GroupieAdapter
import com.xwray.groupie.GroupieViewHolder
import com.xwray.groupie.Item

import kotlinx.android.synthetic.main.activity_message.*
import kotlinx.android.synthetic.main.other_chat_item.view.*
import kotlinx.android.synthetic.main.product_view.view.*

class MessageActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_message)
        topAppBar.setNavigationOnClickListener{
            finish()
        }
        topAppBar.title = "Messages"

        val groupieAdapter = GroupieAdapter()

        groupieAdapter.add(MessageFromItem(Message("Hello friend how are you doing in this blessed day?")))
        groupieAdapter.add(MessageToItem(Message("Hi")))
        groupieAdapter.add(MessageFromItem(Message("Bye")))
        groupieAdapter.add(MessageToItem(Message("Bye!")))


        message_view.apply{
            layoutManager = LinearLayoutManager(this@MessageActivity, LinearLayoutManager.VERTICAL, false)
            adapter = groupieAdapter
        }

    }
}

class MessageFromItem(private val message: Message) : Item<GroupieViewHolder>() {

    override fun getLayout() = R.layout.other_chat_item

    override fun bind(viewHolder: GroupieViewHolder, position: Int){
        viewHolder.itemView.message.text = message.text
    }
}

class MessageToItem(private val message: Message) : Item<GroupieViewHolder>() {

    override fun getLayout() = R.layout.my_chat_item

    override fun bind(viewHolder: GroupieViewHolder, position: Int){
        viewHolder.itemView.message.text = message.text
    }
}

data class Message(
    val text: String,
    //val sender: String
)

