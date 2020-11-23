package com.example.carousel

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_dashboard.*
import androidx.fragment.app.Fragment

class DashboardActivity : AppCompatActivity() {

    private lateinit var textMessage: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_dashboard)
        setSupportActionBar(findViewById(R.id.my_toolbar))
        val homeFragment = HomeFragment()
        val cartFragment = CartFragment()
        val memberAccountPageFragment = MemberAccountPageFragment()
        val login = 0
        setCurrentFragment(homeFragment)

        bottomAppBar.setOnNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.home -> setCurrentFragment(homeFragment)
                R.id.settings -> setCurrentFragment(cartFragment)
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

    public fun refresh()
    {
        finish()
        startActivity(intent)
    }
}