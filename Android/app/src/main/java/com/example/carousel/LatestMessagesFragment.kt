package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.*
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.DataTicket
import com.example.carousel.pojo.ResponseAllTickets
import com.example.carousel.pojo.ResponseCustomerMe
import kotlinx.android.synthetic.main.activity_message.topAppBar
import kotlinx.android.synthetic.main.fragment_latest_messages.*
import java.io.Serializable

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG = "isOrders"
/**
 * A simple [Fragment] subclass.
 * Use the [LatestMessagesFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class LatestMessagesFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var isOrders: Boolean? = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setHasOptionsMenu(true)
        arguments?.let {
            isOrders = it.getBoolean(ARG)
        }
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.top_nav_menu_ticket, menu)
        super.onCreateOptionsMenu(menu, inflater)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when(item.itemId){
            R.id.add -> {
                val fragment = NewTicketFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.activity_main_nav_host_fragment, fragment)
                    ?.commit()
            }
        }
        return false
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_latest_messages, container, false)

    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        topAppBar.setNavigationOnClickListener{
            val fragment = MessageFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_account_page, fragment)
                ?.commit()
        }
        topAppBar.setOnMenuItemClickListener {
            onOptionsItemSelected(it)
        }
        val currentConversations = ArrayList<DataTicket>()
        val adapter = CurrentConversationsAdapter(currentConversations)

        if(!isOrders!!) {
            val apiCallerTickets: ApiCaller<ResponseAllTickets> = ApiCaller(requireActivity())
            apiCallerTickets.Caller = ApiClient.getClient.getAllTickets(LoginActivity.user.id)
            apiCallerTickets.Success = {
                if (it != null) {
                    for(conversation in it.data){
                        currentConversations.add(conversation)
                    }
                    adapter.notifyDataSetChanged()
                }
            }
            apiCallerTickets.Failure = {}
            apiCallerTickets.run()
            //currentConversations.add(User("Admin1"))
            //currentConversations.add(User("Admin2"))
            //currentConversations.add(User("Admin3"))
            //currentConversations.add(User("Admin4"))
        }
        else{
            //currentConversations.add(User("Vendor1"))
            //currentConversations.add(User("Vendor2"))
            //currentConversations.add(User("Vendor3"))
        }

        adapter.onItemClick = { conversation ->
            val intent = Intent(this.context, MessageActivity::class.java)
            intent.putExtra("conversation", conversation)
            startActivity(intent)
        }

        latest_messages.apply{
            layoutManager = LinearLayoutManager(requireContext(), LinearLayoutManager.VERTICAL, false)
            this.adapter = adapter
        }

    }


    data class User(
        val title: String,
        //val sender: String
    ) : Serializable
}