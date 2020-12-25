package com.example.carousel

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.RadioButton
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseGetCategories
import com.example.carousel.pojo.ResponseLogin
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.android.synthetic.main.fragment_categories.*

class CategoriesFragment : Fragment() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        getCategories()
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_categories, container, false)
    }

    fun getCategories() {
        /**val email = login_email.text.toString()
        val password = login_password.text.toString()
        val type: String
        when (findViewById<RadioButton>(R.id.radio_button_customer).isChecked) {
            true -> type = "CLIENT";
            false -> type = "VENDOR"
        }**/

        val apiCallerGetCategories: ApiCaller<ResponseGetCategories> = ApiCaller(activity)
        //apiCallerLogin.Button = login_button
        apiCallerGetCategories.Caller = ApiClient.getClient.getCategories()
        apiCallerGetCategories.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
                    val categories = ArrayList<Category>()
                    for(item in it.data) {
                        if(item.name != null) {
                            if(item.name == "Electronics") {
                                categories.add(Category(item._id, item.name, R.drawable.electronics))
                            }
                            else if(item.name == "Women's Fashion") {
                                categories.add(Category(item._id, item.name, R.drawable.fashion))
                            }
                            else if(item.name == "Men's Fashion") {

                            }
                            else if(item.name == "Home") {
                                categories.add(Category(item._id, item.name, R.drawable.home))
                            }
                            else if(item.name == "Baby") {

                            }
                            else if(item.name == "Beauty and Personal Care") {
                                categories.add(Category(item._id, item.name, R.drawable.beauty))
                            }
                            else if(item.name == "Sports and Outdoor") {
                                categories.add(Category(item._id, item.name, R.drawable.outdoor))
                            }
                            else if(item.name == "Office and Stationery") {
                                categories.add(Category(item._id, item.name, R.drawable.stationery))
                            }
                        }

                    }
                    createCategoryList(categories)
                })
            }
        }
        apiCallerGetCategories.Failure = {}
        apiCallerGetCategories.run()
    }

    private fun createCategoryList(list: ArrayList<Category>){
        val adapter = CategoriesAdapter(list)
        recycler_view.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(adapter)
        }
        /*adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
            intent.putExtra("product",product)
            startActivity(intent)
        }*/
    }

}
