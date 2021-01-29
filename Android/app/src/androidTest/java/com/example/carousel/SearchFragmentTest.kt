package com.example.carousel

import android.app.Instrumentation
import android.widget.ImageView
import android.widget.RelativeLayout
import android.widget.SearchView
import androidx.fragment.app.FragmentContainerView
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.rule.ActivityTestRule
import org.junit.After
import org.junit.Before

import org.junit.Assert.*
import org.junit.Rule
import org.junit.Test

class SearchFragmentTest {

    @get:Rule
    val mActivityTestRule = ActivityTestRule<DashboardActivity>(DashboardActivity::class.java)

    private var mActivity : DashboardActivity? = null

    @Before
    fun setUp() {
        mActivity = mActivityTestRule.activity
    }

    @Test
    public fun testLaunch() {

        val host_fragment: FragmentContainerView? = mActivity?.findViewById(R.id.activity_main_nav_host_fragment)

        assertNotNull(host_fragment)

        val fragment = SearchFragment()

        mActivity?.supportFragmentManager?.beginTransaction()?.add(host_fragment!!.id, fragment)?.commitAllowingStateLoss()

        InstrumentationRegistry.getInstrumentation().waitForIdleSync()

        val searchView = fragment.view?.findViewById<SearchView>(R.id.search_view)

        assertNotNull(searchView)
    }

    @Test
    public fun testPriceFilter() {

    }

    @After
    fun tearDown() {
        mActivity = null
    }
}