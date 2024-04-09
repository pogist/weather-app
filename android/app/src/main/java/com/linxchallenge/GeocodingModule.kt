package com.linxchallenge

import android.location.Geocoder
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class GeocodingModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    private lateinit var geocoder: Geocoder

    override fun initialize() {
        super.initialize()
        geocoder = Geocoder(reactContext)
    }

    @ReactMethod
    fun getLocation(name: String, promise: Promise) {
        try {
            geocoder.getFromLocationName(name, 3) {
                val address = it[0] ?: throw Exception("got null address")
                val location = Arguments.createMap().apply {
                    putDouble("lat", address.latitude)
                    putDouble("long", address.longitude)
                }
                promise.resolve(location)
            }
        } catch (e: Throwable) {
            promise.reject("[Geocoding]: Get location error", e)
        }
    }

    override fun getName(): String = "Geocoding"
}