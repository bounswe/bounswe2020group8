package com.example.carousel

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView.OnItemClickListener
import android.widget.TextView
import android.widget.Toolbar
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentContainerView
import com.example.carousel.R.drawable
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseCustomerMe
import com.example.carousel.pojo.ResponseHeader
import com.example.carousel.pojo.ResponseVendorMe
import com.example.carousel.vendor.VendorDashboardActivity
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.material.appbar.AppBarLayout
import kotlinx.android.synthetic.main.activity_dashboard.*
import kotlinx.android.synthetic.main.fragment_acount_page.*
import kotlinx.android.synthetic.main.fragment_acount_page.view.*
import java.io.*


class MemberAccountPageFragment : Fragment() {
    private var prefs : SharedPreferences? = null
    private lateinit var mAdapter: CustomAdapter
    var login = 0
    var type = "GUEST"
    var name : String? = null
    private var mGoogleSignInClient: GoogleSignInClient? = null

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        prefs = activity?.getSharedPreferences("userInfo", Context.MODE_PRIVATE)
        val gso =
            GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build()
        mGoogleSignInClient = activity?.let { GoogleSignIn.getClient(it, gso) }
        type = ApplicationContext.instance.whoAmI().toString()
        return inflater.inflate(R.layout.fragment_acount_page, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        login = if (ApplicationContext.instance.isUserAuthenticated()) {1} else {0}
        if (login == 0) {
            activity?.supportFragmentManager?.popBackStack()
            view.guest.visibility = View.VISIBLE
            val intent = Intent(activity, LoginActivity::class.java)
            startActivityForResult(intent, 11)
        } else {
            view.login_user.visibility = View.VISIBLE
        }

        pageRender(type, false)

        view.save_button.setOnClickListener {
            val intent = Intent(activity, LoginActivity::class.java)
            startActivityForResult(intent, 11)
        }

        listView.onItemClickListener = OnItemClickListener { adapterView, view, pos, l ->
            if(pos == 1) {
                val fragment = UserInformationFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 2){
                val fragment = ShoppingListFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 3){
                val fragment = ChangePasswordFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 4) {
                val fragment = Settings()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if (pos == 5) {
                type = ApplicationContext.instance.whoAmI().toString()
                logout(type)

                mGoogleSignInClient?.signOut()
                view?.guest?.visibility = View.VISIBLE
                view?.login_user?.visibility = View.INVISIBLE
                ApplicationContext.instance.terminateAuthentication()
                prefs!!.edit().clear().apply()
                if (type == "CLIENT"){
                    (activity as DashboardActivity).refresh()
                }else if (type == "VENDOR"){
                    (activity as VendorDashboardActivity).logout()
                }

            }else if(pos == 8) {
                (activity as DashboardActivity).refresh()
            }else if(pos == 7) {
                val fragment = About()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 8) {
                val fragment = Legals()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 9) {
                val fragment = Contacts()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }
            //TicketList Object
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        val result = data?.getIntExtra("login", login)
        val token = data?.getStringExtra("token")
        writeToFile(token, context)

        if (ApplicationContext.instance.isUserAuthenticated()) {
            login = 1
            type = ApplicationContext.instance.whoAmI().toString()
            pageRender(type, true)
            view?.guest?.visibility = View.INVISIBLE
            view?.login_user?.visibility = View.VISIBLE
        }

        if(resultCode == Activity.RESULT_OK){
            if (type == "VENDOR"){
                (activity as DashboardActivity).transitionToVendor()
            }
        }
    }

    private fun readFromFile(context: Context?): String? {
        var ret = ""
        try {
            val inputStream: InputStream? = context?.openFileInput("config.txt")
            if (inputStream != null) {
                val inputStreamReader = InputStreamReader(inputStream)
                val bufferedReader = BufferedReader(inputStreamReader)
                var receiveString: String? = ""
                val stringBuilder = StringBuilder()
                while (bufferedReader.readLine().also({ receiveString = it }) != null) {
                    stringBuilder.append("\n").append(receiveString)
                }
                inputStream.close()
                ret = stringBuilder.toString()
            }
        } catch (e: FileNotFoundException) {
            Log.e("login activity", "File not found: " + e.toString())
        } catch (e: IOException) {
            Log.e("login activity", "Can not read file: $e")
        }
        return ret
    }

    private fun writeToFile(data: String?, context: Context?) {
        try {
            val outputStreamWriter = OutputStreamWriter(
                context?.openFileOutput(
                    "config.txt",
                    Context.MODE_PRIVATE
                )
            )
            if(data!=null)
                outputStreamWriter.write(data)
            outputStreamWriter.close()
        } catch (e: IOException) {
            Log.e("Exception", "File write failed: " + e.toString())
        }
    }

    private fun pageRender(type: String, redirect: Boolean) {
        if(type.equals("CLIENT")){
            val apiCaller: ApiCaller<ResponseCustomerMe> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.customerMe()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        name = it.data.name + " " + it.data.lastName

                        var username = view?.findViewById<TextView>(R.id.username)
                        username?.setText(name.toString())
                        mAdapter = CustomAdapter(context as Context)
//                        mAdapter.addSectionHeaderItem(name.toString())
                        mAdapter.addSectionHeaderItem("Account")
                        mAdapter.addItem("User Information", drawable.ic_person)
                        mAdapter.addItem("My Lists", drawable.ic_list)
                        mAdapter.addItem("Change Password", drawable.ic_key)
                        mAdapter.addItem("Addresses and Credit Cards", drawable.ic_settings)
                        mAdapter.addItem("Logout", drawable.ic_exit)
                        mAdapter.addSectionHeaderItem("Carousel")
                        mAdapter.addItem("About", drawable.ic_info)
                        mAdapter.addItem("Legals", drawable.ic_file)
                        mAdapter.addItem("Contact", drawable.ic_contact)
                        listView.adapter = (mAdapter)
                        if (redirect) {
                            redirectToHome()
                        }

                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()

        }else if(type.equals("VENDOR")){
            val apiCaller: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
            apiCaller.Caller = ApiClient.getClient.vendorMe()
            apiCaller.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                        name = it.data.companyName
                        username.text = name
                        mAdapter = CustomAdapter(context as Context) //this section will change for vendor profile
                        mAdapter.addSectionHeaderItem("Account")
                        mAdapter.addItem("User Information", drawable.ic_person)
                        mAdapter.addItem("My Lists", drawable.ic_list)
                        mAdapter.addItem("Change Password", drawable.ic_key)
                        mAdapter.addItem("Settings", drawable.ic_settings)
                        mAdapter.addItem("Logout", drawable.ic_exit)
                        mAdapter.addSectionHeaderItem("Carousel")
                        mAdapter.addItem("About", drawable.ic_info)
                        mAdapter.addItem("Legals", drawable.ic_file)
                        mAdapter.addItem("Contact", drawable.ic_contact)
                        listView.adapter = (mAdapter)

                        if (redirect) {
                            redirectToHome()
                        }
                    })
                }
            }
            apiCaller.Failure = {}
            apiCaller.run()
        }else{

        }
    }

    private fun redirectToHome() {
        val fragment = MemberAccountPageFragment()
        activity?.supportFragmentManager?.beginTransaction()
            ?.replace(R.id.fragment_account_page, fragment)
            ?.commit()
        activity!!.bottomAppBar.selectedItemId = R.id.home
    }

    private fun logout(type: String){
        if(type.equals("CLIENT")){
            val apiCallerLogoutCustomer: ApiCaller<ResponseHeader> = ApiCaller(activity)
            apiCallerLogoutCustomer.Caller = ApiClient.getClient.customerLogout()
            apiCallerLogoutCustomer.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                    })
                }
            }
            apiCallerLogoutCustomer.Failure = {
            }
            apiCallerLogoutCustomer.run()

        }else{
            val apiCallerLogoutVendor: ApiCaller<ResponseHeader> = ApiCaller(activity)
            apiCallerLogoutVendor.Caller = ApiClient.getClient.vendorLogout()
            apiCallerLogoutVendor.Success = { it ->
                if (it != null) {
                    activity?.runOnUiThread(Runnable { //Handle UI here
                    })
                }
            }
            apiCallerLogoutVendor.Failure = {
            }
            apiCallerLogoutVendor.run()
        }
    }
}
