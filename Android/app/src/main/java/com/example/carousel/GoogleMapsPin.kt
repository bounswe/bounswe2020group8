package com.example.carousel
import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.ViewStructure
import android.widget.*
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.DataVendorMe
import com.example.carousel.pojo.ResponseCustomerMe2
import com.example.carousel.pojo.ResponseVendorMe
import com.example.carousel.vendor.Location
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions


class GoogleMapsPin : Fragment() {

    var mMapView: MapView? = null
    private var googleMap: GoogleMap? = null
    var locationPermission = false
    val istanbul = LatLng(41.015137, 28.979530)
    val FINE_LOCATION = Manifest.permission.ACCESS_FINE_LOCATION
    val COURSE_LOCATION = Manifest.permission.ACCESS_COARSE_LOCATION
    val LOCATION_PERMISSION_REQUEST_CODE = 1234
    var locations: ArrayList<Location>? = null
    var x: Int = 0

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        pageRender()
        getLocationPermission()
        updateLocation()
        val rootView: View = inflater.inflate(R.layout.fragment_google_locations, container, false)
        mMapView = rootView.findViewById<View>(R.id.map) as MapView
        mMapView!!.onCreate(savedInstanceState)
        mMapView!!.onResume() // needed to get the map to display immediately
        try {
            MapsInitializer.initialize(activity!!.applicationContext)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        mMapView!!.getMapAsync(OnMapReadyCallback { mMap ->
            googleMap = mMap
            val googleMapVal = googleMap
            googleMapVal?.setMyLocationEnabled(true)
            googleMap!!.addMarker(MarkerOptions().position(istanbul).title("Marker in Istanbul"))
            val cameraPosition = CameraPosition.Builder().target(istanbul).zoom(12f).build()
            googleMapVal?.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
        })

        return rootView

    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        var spinner = view.findViewById<Spinner>(R.id.spinner)
        var delete = view.findViewById<Button>(R.id.delete)
        var update = view.findViewById<Button>(R.id.update)

        spinner.onItemSelectedListener = object: AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                if(spinner.selectedItem.equals("New Location")){
                    if(delete.visibility == View.VISIBLE) {
                        delete.visibility = View.INVISIBLE
                    }
                    update.text = "ADD LOCATION"
                    update.setOnClickListener{
                        val latitude: Int = 0
                        val longitude: Int = 0
                        addNewLocation(longitude, latitude)
                    }
                }else{
                    println(position)
                    if(delete.visibility == View.INVISIBLE) {
                        delete.visibility = View.VISIBLE
                    }
                    update.text = "UPDATE"
                    delete.setOnClickListener{
                        deleteLocation(position)
                    }
                }
            }
        }
    }



    private fun getLocationPermission() {
        if (ContextCompat.checkSelfPermission(activity?.applicationContext!!, FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            if (ContextCompat.checkSelfPermission(activity?.applicationContext!!, COURSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                locationPermission = true
            }
        }else {
            ActivityCompat.requestPermissions(
                activity!!, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),LOCATION_PERMISSION_REQUEST_CODE)
        }
    }
    private fun updateLocation() {
        if (googleMap == null) {
            return
        }
        try {
            if (locationPermission) {
                googleMap?.isMyLocationEnabled = true
                googleMap?.uiSettings?.isMyLocationButtonEnabled = true
            } else {
                googleMap?.isMyLocationEnabled = false
                googleMap?.uiSettings?.isMyLocationButtonEnabled = false
                getLocationPermission()
            }
        } catch (e: SecurityException) {
            Log.e("Exception: %s", e.message, e)
        }
    }
    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        locationPermission = false

        when (requestCode) {
            LOCATION_PERMISSION_REQUEST_CODE -> {
                if (grantResults.isNotEmpty()){
                    for(item: Int in grantResults){
                        if(item != PackageManager.PERMISSION_GRANTED) {
                            locationPermission = false
                            return
                        }
                    }
                    locationPermission = true
                }
            }
        }
    }
    private fun pageRender() {
        val apiCaller: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
        apiCaller.Caller = ApiClient.getClient.vendorMe()
        apiCaller.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
                    val dropdown = view?.findViewById<Spinner>(R.id.spinner)
                    locations = it.data.locations
                    var items: Array<String>
                    if (locations?.isNotEmpty() == true) {
                        items = Array(locations!!.size + 1) { i ->
                            if (i != locations!!.size) {
                                ("Location " + (i + 1)).toString()
                            }else {
                                "New Location"
                            }
                        }
                    } else {
                        items = Array(1) { "New Location" }
                    }
                    val adapter = ArrayAdapter<String>(activity!!,android.R.layout.simple_spinner_dropdown_item,items)
                    dropdown!!.adapter = adapter
                })
            }
        }
        apiCaller.Failure = {}
        apiCaller.run()
    }

    private fun addNewLocation(longitude: Int, latitude: Int) {
        var id: String
        var name: String?
        var lastName: String?
        var email: String
        var isSuspended: Boolean
        var isActive: Boolean
        var companyName: String?
        var companyDomainName: String?
        var aboutCompany: String?
        var IBAN: String?
        var address: Address?
        var locations: ArrayList<Location>?

        val apiCaller: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
        apiCaller.Caller = ApiClient.getClient.vendorMe()
        apiCaller.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here

                    id = it.data.id
                    name = it.data.name
                    lastName = it.data.lastName
                    email = it.data.email
                    isSuspended = it.data.isSuspended
                    isActive = it.data.isActive
                    companyName = it.data.companyName
                    companyDomainName = it.data.companyDomainName
                    aboutCompany = it.data.aboutCompany
                    IBAN = it.data.IBAN
                    address = it.data.address

                    val newLocation = Location(longitude, latitude)
                    locations = it.data.locations
                    if(locations?.isNotEmpty() == true) {
                        locations!!.add(newLocation)
                    }else{
                        val tempLocations = arrayListOf(newLocation)
                        locations = tempLocations
                    }

                    var newData = DataVendorMe(
                        id,
                        name,
                        lastName,
                        email,
                        isSuspended,
                        isActive,
                        companyName,
                        companyDomainName,
                        aboutCompany,
                        IBAN,
                        address,
                        locations,
                    )

                    val apiCallerPatch: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
                    apiCallerPatch.Caller = ApiClient.getClient.vendorUpdate(newData)
                    apiCallerPatch.Success = { it ->
                        if (it != null) {
                            activity?.runOnUiThread(Runnable { //Handle UI here
                                pageRender()
                            })
                        }
                    }
                    apiCallerPatch.Failure = {}
                    apiCallerPatch.run()

                })
            }
        }
        apiCaller.Failure = {}
        apiCaller.run()

    }
    private fun deleteLocation(position: Int) {//TODO test whether it deleting right location
        var id: String
        var name: String?
        var lastName: String?
        var email: String
        var isSuspended: Boolean
        var isActive: Boolean
        var companyName: String?
        var companyDomainName: String?
        var aboutCompany: String?
        var IBAN: String?
        var address: Address?
        var locations: ArrayList<Location>?

        val apiCaller: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
        apiCaller.Caller = ApiClient.getClient.vendorMe()
        apiCaller.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here

                    id = it.data.id
                    name = it.data.name
                    lastName = it.data.lastName
                    email = it.data.email
                    isSuspended = it.data.isSuspended
                    isActive = it.data.isActive
                    companyName = it.data.companyName
                    companyDomainName = it.data.companyDomainName
                    aboutCompany = it.data.aboutCompany
                    IBAN = it.data.IBAN
                    address = it.data.address

                    locations = it.data.locations

                    var tempLocations = locations
                    tempLocations!!.removeAt(position)
                    locations = tempLocations


                    var newData = DataVendorMe(
                        id,
                        name,
                        lastName,
                        email,
                        isSuspended,
                        isActive,
                        companyName,
                        companyDomainName,
                        aboutCompany,
                        IBAN,
                        address,
                        locations,
                    )

                    val apiCallerPatch: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
                    apiCallerPatch.Caller = ApiClient.getClient.vendorUpdate(newData)
                    apiCallerPatch.Success = { it ->
                        if (it != null) {
                            activity?.runOnUiThread(Runnable { //Handle UI here
                                pageRender()
                            })
                        }
                    }
                    apiCallerPatch.Failure = {}
                    apiCallerPatch.run()

                })
            }
        }
        apiCaller.Failure = {}
        apiCaller.run()

    }
}
