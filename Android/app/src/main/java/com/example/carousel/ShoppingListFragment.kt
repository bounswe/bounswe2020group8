package com.example.carousel

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Spinner
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.application.ApplicationContext
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.ResponseCustomerMe
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import kotlinx.android.synthetic.main.fragment_home.*
import kotlinx.android.synthetic.main.fragment_order.*
import kotlinx.android.synthetic.main.fragment_shopping_list.*;
import kotlinx.android.synthetic.main.fragment_shopping_list.view.*
import okhttp3.internal.notify


class ShoppingListFragment : Fragment() {

    private var prefs: SharedPreferences? = null
    private lateinit var adapter: ListsAdapter
    private lateinit var spinnerAdapter: ArrayAdapter<String>


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        prefs = activity?.getSharedPreferences("userInfo", Context.MODE_PRIVATE)


        val view = inflater.inflate(R.layout.fragment_shopping_list, container, false)
        view.deleteListButton.setOnClickListener { view ->
            deleteList(view)
        }
        view.createListButton.setOnClickListener { view ->
            createList(view)
        }
        view.addToCartButton.setOnClickListener { view ->
           addListToCart(view)
        }
        return view
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)


        if (lists.isEmpty()) {
            val p1 = Product(title = "PlayStation 4 Pro 1TB", price = 399.99, id = 2, photoUrl = R.drawable.image2)
            val p2 = Product(
                title = "DualSense Wireless Controller \$69.99",
                price = 69.99,
                id = 7,
                photoUrl = R.drawable.image7
            )
            val p3 = Product(
                title = "SAMSUNG 870 QVO SATA III 2.5\\' SSD",
                price = 199.99,
                id = 8,
                photoUrl = R.drawable.image8
            )
            val p4 =
                Product(title = "Samsung Galaxy Tab S6 Lite 10.4", price = 249.9, id = 3, photoUrl = R.drawable.image3)
            val p5 =
                Product(title = "To Kill a Mockingbird 14.99", price = 14.99, id = 10, photoUrl = R.drawable.image10)
            addList("Favourites")
            addList("Watchlist")
            addToList(0, p1)
            addToList(0, p5)
            addToList(1, p2)
            addToList(1, p3)
            addToList(1, p4)
        }
        val spinner = list_choice
        ArrayAdapter(requireContext(), R.layout.shopping_list_names, listNames)
            .also { adapter ->
                adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                // Apply the adapter to the spinner
                spinner.adapter = adapter
                spinnerAdapter = spinner.adapter as ArrayAdapter<String>
            }
        createProductList(lists[0])
        spinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
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

    override fun onPause(){
        super.onPause()
    if(isChanged) {
        val apiCallerPatchUser: ApiCaller<ResponseCustomerMe> = ApiCaller(requireActivity())
        //LoginActivity.user.shoppingLists = lists
        apiCallerPatchUser.Caller = ApiClient.getClient.customerUpdate(LoginActivity.user)
        apiCallerPatchUser.Success = {
            if (it != null) {
                LoginActivity.user = it.data
                isChanged = false
             }
        }
        apiCallerPatchUser.Failure = {}
        apiCallerPatchUser.run()
    }
    }
    private fun createProductList(products: ArrayList<Product>) {
        adapter = ListsAdapter(products)

        products_in_list.apply {
            layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
            setAdapter(this@ShoppingListFragment.adapter)
        }
        adapter.onItemClick = { product ->
            val intent = Intent(this.context, ProductPageActivity::class.java)
            intent.putExtra("product", product)
            startActivity(intent)
        }
    }

    companion object ShoppingList {
        var lists = ArrayList<ArrayList<Product>>()
        var listNames = ArrayList<String>()
        var selectedList = 0
        var isChanged = false
        @JvmStatic
        fun addList(listName: String) {
            lists.add(ArrayList<Product>())
            listNames.add(listName)
            isChanged = true
        }

        fun addToList(listIndex: Int, product: Product) {
            lists[listIndex].add(product)
            isChanged = true
        }

        fun removeList(listIndex: Int) {
            if(lists.isNotEmpty()) {
                listNames.removeAt(listIndex)
                lists.removeAt(listIndex)
                isChanged = true
            }
        }

        fun removeFromList(productIndex: Int) {
            if (lists[selectedList].isNotEmpty()) {
                lists[selectedList].removeAt(productIndex)
                isChanged = true
            }
        }
    }

    private fun deleteList(view: View) {
        var isConfirmed = false
        if(selectedList<2){
            Toast.makeText(requireContext(),"Can't Delete A Default List!", Toast.LENGTH_SHORT).show()
        }
        else {
            MaterialAlertDialogBuilder(requireContext())
                .setTitle(resources.getString(R.string.delete_list_title))
                .setMessage(resources.getString(R.string.delete_list_body))
                .setNeutralButton(resources.getString(R.string.cancel)) { dialog, which ->
                    // Respond to neutral button press
                }
                .setPositiveButton(resources.getString(R.string.delete)) { dialog, which ->
                    // Respond to positive button press
                    val spinner = list_choice
                    removeList(selectedList)
                    selectedList = 0
                    if (lists.isNotEmpty()) {
                        spinner.setSelection(selectedList)
                        adapter.replaceProducts(lists[selectedList])
                    } else {
                        adapter.replaceProducts(ArrayList<Product>())
                    }
                    spinnerAdapter.notifyDataSetChanged()
                    adapter.notifyDataSetChanged()
                    Toast.makeText(requireContext(), "List Deleted Successfully", Toast.LENGTH_SHORT).show()
                }
                .show()

        }
    }

    private fun createList(view: View) {
        val intent = Intent(this.context, CreateListActivity::class.java)
        startActivityForResult(intent,11)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        val isCreated = data?.getBooleanExtra("isCreated", false)
        if(isCreated!!){
            Toast.makeText(requireContext(),"List Created Successfully", Toast.LENGTH_SHORT).show()
        }
    }
    private fun addListToCart(view: View){
        for(product in lists[selectedList]){
            CartFragment.addToCart(product)
        }
        Toast.makeText(requireContext(),"List Added to Cart Successfully", Toast.LENGTH_SHORT).show()
    }

}
