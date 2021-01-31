package com.example.carousel
import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.Spinner
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import com.example.carousel.map.ApiCaller
import com.example.carousel.map.ApiClient
import com.example.carousel.pojo.DataVendorMe
import com.example.carousel.pojo.ResponseVendorMe
import com.example.carousel.vendor.Location
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.CameraPosition
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.Marker
import com.google.android.gms.maps.model.MarkerOptions
import kotlinx.android.synthetic.main.fragment_add_address.view.*
import kotlinx.android.synthetic.main.fragment_google_locations.view.*


class GoogleMapsPin : Fragment() {

    var mMapView: MapView? = null
    private var googleMap: GoogleMap? = null
    var locationPermission = false
    val istanbul = LatLng(41.015137, 28.979530)
    val FINE_LOCATION = Manifest.permission.ACCESS_FINE_LOCATION
    val COURSE_LOCATION = Manifest.permission.ACCESS_COARSE_LOCATION
    val LOCATION_PERMISSION_REQUEST_CODE = 1234
    var locations: ArrayList<Location>? = null
    var selectedLatitude: Double? = 41.015137
    var selectedLongitude: Double? = 28.979530

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        pageRender(null)
        getLocationPermission()
        updateLocationUI()
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
//            val googleMapVal = googleMap
//            googleMapVal?.setMyLocationEnabled(true)
//            googleMap!!.addMarker(MarkerOptions().position(istanbul).title("Marker in Istanbul"))
//            val cameraPosition = CameraPosition.Builder().target(istanbul).zoom(12f).build()
//            googleMapVal?.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
            googleMap?.setOnMapClickListener(object : GoogleMap.OnMapClickListener {
                override fun onMapClick(p0: LatLng?) {
                    selectedLongitude = p0?.longitude
                    selectedLatitude = p0?.latitude
                    val markerOptions = MarkerOptions()
                    markerOptions.position(p0!!)
                    var spinner = view?.findViewById<Spinner>(R.id.spinner)
                    markerOptions.title(spinner?.selectedItem.toString());
                    googleMap!!.clear()
                    googleMap!!.animateCamera(CameraUpdateFactory.newLatLng(p0));

                    googleMap!!.addMarker(markerOptions)
                    println(selectedLatitude.toString() + selectedLongitude.toString())
                }
            })

        })
        return rootView
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        var spinner = view.findViewById<Spinner>(R.id.spinner)
        var delete = view.findViewById<Button>(R.id.delete)
        var update = view.findViewById<Button>(R.id.update)
        var back = view.findViewById<Button>(R.id.back)

        view.back.setOnClickListener{
            delete.visibility = View.INVISIBLE
            update.visibility = View.INVISIBLE
            back.visibility = View.INVISIBLE
            val fragment = MemberAccountPageFragment()
            activity?.supportFragmentManager?.beginTransaction()
                ?.replace(R.id.fragment_google_locations, fragment)
                ?.commit()
        }

        spinner.onItemSelectedListener = object: AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }
            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                if(spinner.selectedItem.equals("New Location")){
                    if(delete.visibility == View.VISIBLE) {
                        delete.visibility = View.INVISIBLE
                    }
                    update.text = "ADD LOCATION"
                    mapRender(-1)
                    update.setOnClickListener{
                        locationCRUD(null, selectedLongitude, selectedLatitude, 0)
                    }
                }else{
                    if(delete.visibility == View.INVISIBLE) {
                        delete.visibility = View.VISIBLE
                    }
                    update.text = "UPDATE"
                    mapRender(position);

                    delete.setOnClickListener{
                        locationCRUD(position, null, null, 1)
                    }
                    update.setOnClickListener{
                        val latitude: Int = 10
                        val longitude: Int = 10
                        locationCRUD(position, selectedLongitude, selectedLatitude, 2)
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
                activity!!, arrayOf(Manifest.permission.ACCESS_FINE_LOCATION), LOCATION_PERMISSION_REQUEST_CODE
            )
        }
    }
    private fun updateLocationUI() {
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
                if (grantResults.isNotEmpty()) {
                    for (item: Int in grantResults) {
                        if (item != PackageManager.PERMISSION_GRANTED) {
                            locationPermission = false
                            return
                        }
                    }
                    locationPermission = true
                }
            }
        }
    }
    private fun pageRender(position: Int?) {
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
                            } else {
                                "New Location"
                            }
                        }
                    } else {
                        items = Array(1) { "New Location" }
                    }
                    val adapter = ArrayAdapter<String>(activity!!, android.R.layout.simple_spinner_dropdown_item, items)
                    dropdown!!.adapter = adapter


                })
            }
        }
        apiCaller.Failure = {}
        apiCaller.run()
    }

    private fun locationCRUD(position: Int?, longitude: Double?, latitude: Double?, operation: Int) {
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

                    if (operation == 0) {//Add location operation

                        val newLocation = Location(longitude!!, latitude!!)
                        if (locations?.isNotEmpty() == true) {
                            locations!!.add(newLocation)
                        } else {
                            val tempLocations = arrayListOf(newLocation)
                            locations = tempLocations
                        }

                    } else if (operation == 1) {//delete location operation

                        var tempLocations = locations
                        tempLocations!!.removeAt(position!!)
                        locations = tempLocations

                    } else if (operation == 2) {//update location operation

                        val newLocation = Location(longitude!!, latitude!!)
                        var tempLocations = locations
                        tempLocations!!.removeAt(position!!)
                        tempLocations.add(position, newLocation)
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
                                if (operation == 0) {//Add location operation || It returns to Location 1 after addition. It would be good to stay at the recent added Location.
                                    pageRender(locations!!.size-1)
                                } else if (operation == 1) {//delete location operation
                                    pageRender(null)
                                } else if (operation == 2) {//update location operation
                                    mapRender(position!!)
                                }
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
    private fun mapRender(position: Int) {
        var locations: ArrayList<Location>?
        val apiCaller: ApiCaller<ResponseVendorMe> = ApiCaller(activity)
        apiCaller.Caller = ApiClient.getClient.vendorMe()
        apiCaller.Success = { it ->
            if (it != null) {
                activity?.runOnUiThread(Runnable { //Handle UI here
                    if(position==-1){
                        googleMap!!.clear()
                        val googleMapVal = googleMap
                        googleMapVal?.setMyLocationEnabled(true)
                        googleMap!!.addMarker(MarkerOptions().position(istanbul).title("New Location"))
                        val cameraPosition = CameraPosition.Builder().target(istanbul).zoom(12f).build()
                        googleMapVal?.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
                    }else {
                        locations = it.data.locations
                        var tempLocation = locations?.get(position)
                        val location = LatLng(tempLocation?.latitude!!, tempLocation.longitude)
                        googleMap!!.clear()
                        val googleMapVal = googleMap
                        googleMapVal?.setMyLocationEnabled(true)
                        googleMap!!.addMarker(MarkerOptions().position(location).title("Location " + (position + 1)))
                        val cameraPosition = CameraPosition.Builder().target(location).zoom(12f).build()
                        googleMapVal?.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition))
                    }
                })
            }
        }
        apiCaller.Failure = {}
        apiCaller.run()
    }

}
