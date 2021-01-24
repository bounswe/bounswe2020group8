package com.example.carousel

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.view.View
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.*
import com.xwray.groupie.GroupieAdapter
import com.xwray.groupie.GroupieViewHolder
import com.xwray.groupie.Item

import kotlinx.android.synthetic.main.activity_message.*
import kotlinx.android.synthetic.main.activity_message.view.*
import kotlinx.android.synthetic.main.fragment_new_ticket.*
import kotlinx.android.synthetic.main.other_chat_item.view.*
import kotlinx.android.synthetic.main.product_view.view.*

class MessageActivity : AppCompatActivity() {
    lateinit var groupieAdapter: GroupieAdapter
    lateinit var conversation: ArrayList<DataConversation>
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_message)
        topAppBar.setNavigationOnClickListener{
            finish()
        }
        conversation = (intent.getSerializableExtra("conversation") as DataTicket).conversation
        topAppBar.title = (intent.getSerializableExtra("conversation") as DataTicket).topic

        message_text.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable?) {
                send_button.isEnabled = s?.length!!>0
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
            }
        }

        )
        groupieAdapter = GroupieAdapter()

        //groupieAdapter.add(MessageFromItem(Message("Hello friend how are you doing in this blessed day?")))
        //groupieAdapter.add(MessageToItem(Message("Hi")))
        //groupieAdapter.add(MessageFromItem(Message("Bye")))
        //groupieAdapter.add(MessageToItem(Message("Bye!")))
        for(message in conversation) {
           if(!message.payload.isNullOrEmpty()) {
               when (message.isSentByAdmin) {
                   true -> groupieAdapter.add(MessageFromItem(Message(message.payload)))
                   false -> groupieAdapter.add(MessageToItem(Message(message.payload)))
               }
           }
            //Select view according to whose message it is
        }

        message_view.apply{
            layoutManager = LinearLayoutManager(this@MessageActivity, LinearLayoutManager.VERTICAL, false)
            adapter = groupieAdapter
        }

    }
    fun sendMessage(view: View){
        val apiCallerReply: ApiCaller<ResponseTicket> = ApiCaller(this)
        apiCallerReply.Caller = ApiClient.getClient.replyToTicket(
            (intent.getSerializableExtra("conversation") as DataTicket)._id,
            ReplyTicket(message_layout.editText?.text.toString())
        )
        apiCallerReply.Success = {
            groupieAdapter.add(MessageToItem(Message(message_layout.editText?.text.toString())))
            message_text.setText("")
        }
        apiCallerReply.Failure = {}
        apiCallerReply.run()

    }
}

class MessageFromItem(private val message: Message) : Item<GroupieViewHolder>() {//Received message view

    override fun getLayout() = R.layout.other_chat_item

    override fun bind(viewHolder: GroupieViewHolder, position: Int){
        viewHolder.itemView.message.text = message.text
    }
}

class MessageToItem(private val message: Message) : Item<GroupieViewHolder>() {//Sent message view

    override fun getLayout() = R.layout.my_chat_item

    override fun bind(viewHolder: GroupieViewHolder, position: Int){
        viewHolder.itemView.message.text = message.text
    }
}

data class Message(
    val text: String,
    //val sender: String
)

