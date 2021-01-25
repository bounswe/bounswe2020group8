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



class MessageFragment : Fragment() {


    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        topAppBar.setNavigationOnClickListener{
            val fragment = MemberAccountPageFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.activity_main_nav_host_fragment, fragment)
                ?.commit()
        }

        orders.setOnClickListener {

        }
        tickets.setOnClickListener {
            tickets.visibility = View.GONE
            orders.visibility = View.GONE
            val fragment = LatestTicketsFragment()
            activity?.supportFragmentManager?.beginTransaction()?.replace(R.id.activity_main_nav_host_fragment, fragment, )?.commit()
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
                }
            }
    }
}