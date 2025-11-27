package com.LIFECHANGE

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.LIFECHANGE.BuildConfig

class MainApplicationLC : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
    object : DefaultReactNativeHost(this) {

      override fun getPackages(): List<ReactPackage> {
        try {
          val cls = Class.forName("${BuildConfig.APPLICATION_ID}.PackageList")
          val ctor = cls.getConstructor(ReactNativeHost::class.java)
          val instance = ctor.newInstance(this)
          val m = cls.getMethod("getPackages")
          @Suppress("UNCHECKED_CAST")
          return m.invoke(instance) as List<ReactPackage>
        }
        catch (t: Throwable) {
          return emptyList()
        }
      }

      override fun getJSMainModuleName(): String = "index"
      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(applicationContext, reactNativeHost)
  }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }
}
