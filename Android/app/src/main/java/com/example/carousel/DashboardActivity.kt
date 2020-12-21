package com.example.carousel

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseCustomerMe
import kotlinx.android.synthetic.main.activity_dashboard.*


class DashboardActivity : AppCompatActivity() {
    private lateinit var textMessage: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)
        setSupportActionBar(findViewById(R.id.my_toolbar))
        val homeFragment = HomeFragment()
        val categoriesFragment = CategoriesFragment()
        val cartFragment = CartFragment()
        val searchFragment = SearchFragment()
        val memberAccountPageFragment = MemberAccountPageFragment()
        val login = 0
        setCurrentFragment(homeFragment)
        val prefs = getSharedPreferences(
            "userInfo",
            Context.MODE_PRIVATE
        )
        if (prefs.getBoolean("isAuthenticated", false)) {
            ApplicationContext.instance.authenticate(
                prefs.getString("token", "")!!
            )
            val apiCallerGetUser: ApiCaller<ResponseCustomerMe> = ApiCaller(this@DashboardActivity)
            apiCallerGetUser.Caller = ApiClient.getClient.customerMe()
            apiCallerGetUser.Success = {
                if (it != null) {
                        LoginActivity.user = it.data
                }
            }
            apiCallerGetUser.Failure = {}
            apiCallerGetUser.run()
        }

        bottomAppBar.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.home -> setCurrentFragment(homeFragment)
                R.id.categories -> setCurrentFragment(categoriesFragment)
                R.id.settings -> setCurrentFragment(cartFragment)
                R.id.search -> setCurrentFragment(searchFragment)
                R.id.person -> setCurrentFragment(memberAccountPageFragment)
            }
            true

        }

    }

    private fun setCurrentFragment(fragment: Fragment) =
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.activity_main_nav_host_fragment, fragment)
            commit()
        }

    fun refresh() {
        finish()
        startActivity(intent)
    }
}