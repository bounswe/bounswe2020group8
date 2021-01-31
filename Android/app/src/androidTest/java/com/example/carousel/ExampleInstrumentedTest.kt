package com.example.carousel


import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.intent.Intents
import androidx.test.espresso.intent.Intents.intended
import androidx.test.espresso.intent.matcher.ComponentNameMatchers.hasShortClassName
import androidx.test.espresso.intent.matcher.IntentMatchers.hasComponent
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.After


import org.junit.Test
import org.junit.runner.RunWith

import org.junit.Before
import org.junit.Rule

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4::class)
class LoginTest {

    @Before
    fun setUp(){
        Intents.init()
    }
    @After
    fun tearDown(){
        Intents.release()
    }
    //}
    @get:Rule
    val activityRule = ActivityScenarioRule(LoginActivity::class.java)
        @Test fun testLoginRegisteredUser() {
            onView(withId(R.id.login_email))
                .perform(typeText("testuser@test.com"), closeSoftKeyboard())
            onView(withId(R.id.login_password))
                .perform(typeText("111111"), closeSoftKeyboard())
            onView(withId(R.id.save_button)).perform(click())
            intended(hasComponent(hasShortClassName(".DashboardActivity")))

    }
}