package com.example.carousel

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView.OnItemClickListener
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.carousel.R.drawable
import kotlinx.android.synthetic.main.fragment_acount_page.*
import kotlinx.android.synthetic.main.fragment_acount_page.view.*


class MemberAccountPageFragment : Fragment() {

	private lateinit var mAdapter : CustomAdapter
    var login = 0
	override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {

        return inflater.inflate(R.layout.fragment_acount_page, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        mAdapter =  CustomAdapter(context as Context)
        mAdapter.addSectionHeaderItem("Account" )
        mAdapter.addItem("User Information", drawable.ic_person )
        mAdapter.addItem("Change Password", drawable.ic_key)
        mAdapter.addItem("Settings",drawable.ic_settings )
        mAdapter.addItem("Logout",drawable.ic_exit )
        mAdapter.addSectionHeaderItem("Carousel" )
        mAdapter.addItem("About", drawable.ic_info)
        mAdapter.addItem("Legals", drawable.ic_file)
        mAdapter.addItem("Contact", drawable.ic_contact)
        listView.adapter = (mAdapter)
        if (login == 1){
            view.guest.visibility = View.VISIBLE
            val intent = Intent(activity, LoginActivity::class.java)
            startActivityForResult(intent,11)
        }else{
            view.login_user.visibility = View.VISIBLE
        }
        view.login_button.setOnClickListener {
            val intent = Intent(activity, LoginActivity::class.java)
            startActivityForResult(intent,11)
        }
        listView.onItemClickListener = OnItemClickListener { adapterView, view, pos, l ->
            Toast.makeText(context, pos.toString(),Toast.LENGTH_SHORT).show()
            //TicketList Object
        }
	}

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        val result = data?.getIntExtra("login", login)

        if (result == 1){
            login = result
            view?.guest?.visibility = View.INVISIBLE
            view?.login_user?.visibility = View.VISIBLE
        }
    }
}