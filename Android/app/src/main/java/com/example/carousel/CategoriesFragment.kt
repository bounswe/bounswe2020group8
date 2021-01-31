package com.example.carousel

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseGetCategories
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
                                categories.add(Category(item._id, "Electronics", R.drawable.electronics))
                            }
                            else if(item.name == "Fashion") {
                                categories.add(Category(item._id, "Fashion", R.drawable.fashion))
                            }
                            else if(item.name == "Men's Fashion") {
                                categories.add(Category(item._id, item.name, R.drawable.fashion))
                            }
                            else if(item.name == "Home") {
                                categories.add(Category(item._id, item.name, R.drawable.home))
                            }
                            else if(item.name == "Baby") {
                                categories.add(Category(item._id, item.name, R.drawable.fashion))
                            }
                            else if(item.name == "Beauty and Personal Care") {
                                categories.add(Category(item._id, item.name, R.drawable.beauty))
                            }
                            else if(item.name == "Sports and Outdoors") {
                                categories.add(Category(item._id, item.name, R.drawable.outdoor))
                            }
                            else if(item.name == "Toys and Hobbies") {
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
        adapter.onItemClick = { category ->
            // search for category
            val query = category.title
            val fragment = SearchFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.activity_main_nav_host_fragment, fragment)
                ?.runOnCommit { fragment.searchCall(query) }
                ?.commit()
        }
    }


}