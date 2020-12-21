package com.example.carousel

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import kotlinx.android.synthetic.main.activity_create_list.*

class CreateListActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_list)
    }
    fun cancel(view: View){
        finish()
    }
    fun create(view: View){
        ShoppingListFragment.ShoppingList.addList(list_name.text.toString())
        finish()
    }
}