package com.example.carousel

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import kotlinx.android.synthetic.main.activity_message.*
import kotlinx.android.synthetic.main.fragment_message.*
import kotlinx.android.synthetic.main.fragment_message.topAppBar

//import kotlinx.android.synthetic.main.fragment_message.item_count

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [MessageFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class MessageFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
        //val intent = Intent(this.requireContext(), MessageActivity::class.java)
        //startActivity(intent)
        //val fragment = LatestMessagesFragment()
        //activity?.supportFragmentManager?.beginTransaction()
            //?.replace(R.id.fragment_message, fragment)
            //?.commit()
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        order_count.text = "My Orders (3)"
        ticket_count.text = "My Tickets (4)"

        topAppBar.setNavigationOnClickListener{
            val fragment = MemberAccountPageFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_account_page, fragment)
                ?.commit()
        }

        orders.setOnClickListener {
            tickets.visibility = View.GONE
            orders.visibility = View.GONE
            val fragment = LatestMessagesFragment()
            val bundle = Bundle()
            bundle.putBoolean("isOrders", true)
            fragment.arguments = bundle
            activity?.supportFragmentManager?.beginTransaction()?.replace(R.id.fragment_message, fragment, "tag")?.commit()
        }
        tickets.setOnClickListener {
            tickets.visibility = View.GONE
            orders.visibility = View.GONE
            val fragment = LatestMessagesFragment()
            val bundle = Bundle()
            bundle.putBoolean("isOrders", false)
            fragment.arguments = bundle
            activity?.supportFragmentManager?.beginTransaction()?.replace(R.id.fragment_message, fragment)?.commit()
        }


    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_message, container, false)
    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment MessageFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: Boolean) =
            MessageFragment().apply {
                arguments = Bundle().apply {
                    putBoolean("isOrders", param1)
                }
            }
    }
}