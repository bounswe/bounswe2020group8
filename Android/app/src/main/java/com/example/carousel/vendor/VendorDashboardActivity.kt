package com.example.carousel.vendor

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.carousel.*
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseCustomerMe
import kotlinx.android.synthetic.main.activity_vendor_dashboard.*

class VendorDashboardActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_vendor_dashboard)
        setSupportActionBar(findViewById(R.id.vendor_my_toolbar))

        val homeFragment = VendorHomeFragment()
        val ordersFragment = VendorOrdersFragment()
        val memberAccountPageFragment = MemberAccountPageFragment()
        val login = 0
        setCurrentFragment(homeFragment)

        bottomAppBar.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.homeVendor -> setCurrentFragment(homeFragment)
                R.id.ordersVendor -> setCurrentFragment(ordersFragment)
                R.id.accountVendor -> setCurrentFragment(memberAccountPageFragment)
            }
            true

        }
    }

    private fun setCurrentFragment(fragment: Fragment) =
        supportFragmentManager.beginTransaction().apply {
            replace(R.id.activity_vendor_main_nav_host_fragment, fragment)
            commit()
        }

    fun logout() {
        val intent = Intent(this, DashboardActivity::class.java)
        startActivity(intent)
        finish()
    }
}