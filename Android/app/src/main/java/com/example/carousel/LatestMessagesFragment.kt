package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.*
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
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
    private var isOrders: Boolean? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            isOrders = it.getBoolean(ARG)
        }
    }

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        super.onCreateOptionsMenu(menu, inflater)

    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return super.onOptionsItemSelected(item)
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
            val fragment = MemberAccountPageFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_account_page, fragment)
                ?.commit()
        }
        val currentConversations = ArrayList<User>()
        if(!isOrders!!) {
            currentConversations.add(User("Admin1"))
            currentConversations.add(User("Admin2"))
            currentConversations.add(User("Admin3"))
            currentConversations.add(User("Admin4"))
        }
        else{
            currentConversations.add(User("Vendor1"))
            currentConversations.add(User("Vendor2"))
            currentConversations.add(User("Vendor3"))
        }
        val adapter = CurrentConversationsAdapter(currentConversations)

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
        val name: String,
        //val sender: String
    ) : Serializable
}