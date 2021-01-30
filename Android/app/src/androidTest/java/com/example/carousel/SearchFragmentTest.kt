package com.example.carousel

import android.widget.Button
import android.widget.EditText
import android.widget.SearchView
import androidx.fragment.app.FragmentContainerView
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.rule.ActivityTestRule
import com.example.carousel.SearchFragment
import org.junit.After
import org.junit.Assert.assertNotNull
import org.junit.Before
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
    public fun testButton_0_50() {
        val button = mActivity?.findViewById<Button>(R.id.button_0_50)
        button?.performClick()

        val min_price = mActivity?.findViewById<EditText>(R.id.min_price)
        assert(min_price?.text.toString() == "0")

        val max_price = mActivity?.findViewById<EditText>(R.id.max_price)
        assert(max_price?.text.toString() == "50")
    }

    @Test
    public fun testButton_50_100() {
        val button = mActivity?.findViewById<Button>(R.id.button_50_100)
        button?.performClick()

        val min_price = mActivity?.findViewById<EditText>(R.id.min_price)
        assert(min_price?.text.toString() == "50")

        val max_price = mActivity?.findViewById<EditText>(R.id.max_price)
        assert(max_price?.text.toString() == "100")
    }

    @Test
    public fun testButton_100_250() {
        val button = mActivity?.findViewById<Button>(R.id.button_100_250)
        button?.performClick()

        val min_price = mActivity?.findViewById<EditText>(R.id.min_price)
        assert(min_price?.text.toString() == "100")

        val max_price = mActivity?.findViewById<EditText>(R.id.max_price)
        assert(max_price?.text.toString() == "250")
    }

    @Test
    public fun testButton_250_500() {
        val button = mActivity?.findViewById<Button>(R.id.button_250_500)
        button?.performClick()

        val min_price = mActivity?.findViewById<EditText>(R.id.min_price)
        assert(min_price?.text.toString() == "250")

        val max_price = mActivity?.findViewById<EditText>(R.id.max_price)
        assert(max_price?.text.toString() == "500")
    }

    @Test
    public fun testButton_500_plus() {
        val button = mActivity?.findViewById<Button>(R.id.button_500_plus)
        button?.performClick()

        val min_price = mActivity?.findViewById<EditText>(R.id.min_price)
        assert(min_price?.text.toString() == "500")

        val max_price = mActivity?.findViewById<EditText>(R.id.max_price)
        assert(max_price?.text.toString() == "")
    }


    @After
    fun tearDown() {
        mActivity = null
    }
}