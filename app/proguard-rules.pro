# Keep Kotlin data classes used by Retrofit/Gson (prevents field name obfuscation)
-keep class com.keepnc.data.remote.dto.** { *; }
-keep class com.keepnc.data.auth.** { *; }

# Keep all classes and members annotated with @Keep
-keep @androidx.annotation.Keep class * { *; }
-keepclassmembers class * {
    @androidx.annotation.Keep *;
}

# Gson
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn sun.misc.**
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
}
-keep,allowobfuscation,allowshrinking class com.google.gson.reflect.TypeToken
-keep,allowobfuscation,allowshrinking class * extends com.google.gson.reflect.TypeToken

# OkHttp
-dontwarn okhttp3.**
-dontwarn okio.**

# Retrofit
-keepattributes Signature
-keepattributes Exceptions
-keepclassmembers,allowshrinking,allowobfuscation interface * {
    @retrofit2.http.* <methods>;
}

# Markwon
-keep class io.noties.markwon.** { *; }

# Room — keep entity field names
-keep class com.keepnc.data.local.** { *; }
