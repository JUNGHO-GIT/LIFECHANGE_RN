if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "C:/Users/jungh/.gradle/caches/8.14.3/transforms/a1b20d1f5d654a8599afc6d354b05f86/transformed/jetified-hermes-android-250829098.0.14-release/prefab/modules/hermesvm/libs/android.arm64-v8a/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/jungh/.gradle/caches/8.14.3/transforms/a1b20d1f5d654a8599afc6d354b05f86/transformed/jetified-hermes-android-250829098.0.14-release/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

