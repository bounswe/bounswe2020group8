package com.example.carousel

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.application.ApplicationContext
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import kotlinx.android.synthetic.main.fragment_home.*
import kotlinx.android.synthetic.main.fragment_shopping_list.*;
// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [ShoppingListFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ShoppingListFragment : Fragment() {

    private var prefs : SharedPreferences? = null
    private lateinit var adapter: ListsAdapter

    //private lateinit var mAdapter: CustomAdapter
    //var login = 0
    //private var mGoogleSignInClient: GoogleSignInClient? = null

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        prefs = activity?.getSharedPreferences("userInfo", Context.MODE_PRIVATE)


        return inflater.inflate(R.layout.fragment_shopping_list, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)



            val p1 = Product(title = "PlayStation 4 Pro 1TB", price = 399.99, id = 2, photoUrl = R.drawable.image2)
            val p2 = Product(
                title = "DualSense Wireless Controller \$69.99",
                price = 69.99,
                id = 7,
                photoUrl = R.drawable.image7
            )
            val p3 = Product(title = "SAMSUNG 870 QVO SATA III 2.5\\' SSD", price = 199.99, id = 8, photoUrl = R.drawable.image8)
            val p4 = Product(title = "Samsung Galaxy Tab S6 Lite 10.4", price = 249.9, id = 3, photoUrl = R.drawable.image3)
            val p5 = Product(title = "To Kill a Mockingbird 14.99", price = 14.99, id = 10, photoUrl = R.drawable.image10)
            addList("Must buy")
            addList("Wait for discount")
            addToList(0,p1)
            addToList(0,p5)
            addToList(1,p2)
            addToList(1,p3)
            addToList(1,p4)

        val spinner: Spinner = list_choice
        ArrayAdapter(requireContext(),R.layout.shopping_list_names, listNames)
            .also{
                    adapter->adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                // Apply the adapter to the spinner
                spinner.adapter = adapter
            }
        createProductList(lists[0])
        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, pos: Int, id: Long) {
                if (parent != null) {
                    parent.getItemAtPosition(pos)
                    selectedList = pos
                    adapter.replaceProducts(lists[pos])
                    adapter.notifyDataSetChanged()
                }

            }

        }
    }
    private fun createProductList(products: ArrayList<Product>){
        adapter = ListsAdapter(products)
        products_in_list.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(this@ShoppingListFragment.adapter)
        }
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
            intent.putExtra("product",product)
            startActivity(intent)
        }
    }
    companion object ShoppingList{
        var lists = ArrayList<ArrayList<Product>>()
        var listNames = ArrayList<String>()
        var selectedList = 0

        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            ShoppingListFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
        fun addList(listName: String){
            lists.add(ArrayList<Product>())
            listNames.add(listName)
        }
        fun addToList(listIndex: Int, product: Product){
            lists[listIndex].add(product)
        }
        fun removeList(listName: String){
            for(i in 0..listNames.size){
                if(listNames[i] == listName){
                    listNames.removeAt(i)
                    lists.removeAt(i)
                }
            }
        }
        fun removeFromList(productIndex: Int ){
                if(lists[selectedList].isNotEmpty())
                    lists[selectedList].removeAt(productIndex)
            }
        }
    }
