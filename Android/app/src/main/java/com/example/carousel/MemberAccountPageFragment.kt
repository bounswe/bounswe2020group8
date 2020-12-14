package com.example.carousel

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView.OnItemClickListener
import androidx.fragment.app.Fragment
import com.example.carousel.R.drawable
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import kotlinx.android.synthetic.main.fragment_acount_page.*
import kotlinx.android.synthetic.main.fragment_acount_page.view.*
import java.io.*


class MemberAccountPageFragment : Fragment(){

	private lateinit var mAdapter : CustomAdapter
    var login = 0
    private var mGoogleSignInClient: GoogleSignInClient? = null
	override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val gso =
            GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build()

        mGoogleSignInClient = activity?.let { GoogleSignIn.getClient(it, gso) }
        return inflater.inflate(R.layout.fragment_acount_page, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
//        if (readFromFile(context) != ""){
//            login = 1
//        }
//        else{
//            login = 0
//        }

        login = 1

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
        if (login == 0){
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
            if(pos == 1){
                val fragment = UserInformationFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 2){
                val fragment = ChangePasswordFragment()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 3) {
                val fragment = Settings()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if (pos == 4) {
                mGoogleSignInClient?.signOut()
                view?.guest?.visibility = View.VISIBLE
                view?.login_user?.visibility = View.INVISIBLE
                writeToFile("", context)
                (activity as DashboardActivity).refresh()
            }else if(pos == 6) {
                val fragment = About()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 7) {
                val fragment = Legals()
                activity?.supportFragmentManager?.beginTransaction()
                    ?.replace(R.id.fragment_account_page, fragment)
                    ?.commit()
            }else if(pos == 8) {
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

        if (result == 1){
            login = result
            view?.guest?.visibility = View.INVISIBLE
            view?.login_user?.visibility = View.VISIBLE
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
}