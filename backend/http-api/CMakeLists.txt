cmake_minimum_required(VERSION 3.10.0)
project(ahoh VERSION 0.1.0 LANGUAGES CXX)

find_package(spdlog REQUIRED)

set(CROW_USE_BOOST ON)
add_subdirectory(vendor/Crow)

file(GLOB_RECURSE sources CONFIGURE_DEPENDS src/*.cpp inc/*.hpp)
add_executable(ahoh-http-server ${sources})
set_target_properties(ahoh-http-server PROPERTIES
    CXX_STANDARD 20
    CXX_STANDARD_REQUIRED YES
    CXX_EXTENSIONS NO
)
target_include_directories(ahoh-http-server PUBLIC
    spdlog::spdlog
    include
    vendor/Crow/include
)
add_dependencies(ahoh-http-server Crow)
target_link_libraries(ahoh-http-server PUBLIC spdlog::spdlog)
add_compile_definitions(ahoh-http-server CROW_USE_BOOST)

execute_process( COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_CURRENT_LIST_DIR}/templates ${CMAKE_CURRENT_LIST_DIR}/../../build/templates)
execute_process( COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_CURRENT_LIST_DIR}/static ${CMAKE_CURRENT_LIST_DIR}/../../build/static)
execute_process( COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_CURRENT_LIST_DIR}/tls ${CMAKE_CURRENT_LIST_DIR}/../../build/tls)