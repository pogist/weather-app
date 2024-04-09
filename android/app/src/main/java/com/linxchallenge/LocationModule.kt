package com.linxchallenge

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import androidx.annotation.RequiresPermission
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.location.CurrentLocationRequest
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices

class LocationModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    private lateinit var fusedLocationProviderClient: FusedLocationProviderClient

    override fun initialize() {
        super.initialize()
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(reactContext)
    }

    @SuppressLint("MissingPermission")
    @ReactMethod
    fun getCurrent(promise: Promise) {
        val request = CurrentLocationRequest.Builder().build()
        fusedLocationProviderClient
            .getCurrentLocation(request, null)
            .addOnCompleteListener {
                val params = Arguments.createMap()?.apply {
                    putDouble("lat", it.result.latitude)
                    putDouble("long", it.result.longitude)
                }
                promise.resolve(params)
            }
            .addOnFailureListener {
                promise.reject("Failed to get current location", it)
            }
    }

    override fun getName(): String = "Location"
}