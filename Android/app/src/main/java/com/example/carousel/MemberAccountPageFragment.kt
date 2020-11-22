package com.example.carousel

import android.content.Intent
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.carousel.R.string
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
        mAdapter.addItem("User Information", string.fa_user_solid )
        mAdapter.addItem("Change Password", string.fa_key_solid)
        mAdapter.addItem("Settings",string.fa_cog_solid )
        mAdapter.addItem("Logout",string.fa_sign_out_alt_solid )
        mAdapter.addSectionHeaderItem("Carousel" )
        mAdapter.addItem("About",string.fa_info_solid )
        mAdapter.addItem("Legals",string.fa_file_contract_solid)
        mAdapter.addItem("Contact", string.fa_id_card )
        listView.adapter = (mAdapter)
        if (login == 0){
            view.guest.visibility = View.VISIBLE
            val intent = Intent(activity, LoginActivity::class.java)
            startActivityForResult(intent,11)
        }else{
            view.guest.visibility = View.VISIBLE
        }
        view.login_button.setOnClickListener {
            val intent = Intent(activity, LoginActivity::class.java)
            startActivityForResult(intent,11)
        }
	}

    override fun onResume() {
        super.onResume()
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