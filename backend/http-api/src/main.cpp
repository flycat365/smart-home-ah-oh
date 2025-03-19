#include <spdlog/spdlog.h>
#include <crow.h>
#include <format>

int main() {
    spdlog::info("hello ahoh-http-server!");
    crow::App<> app;
    auto index_page = crow::mustache::load_text("index.html");
    
    CROW_ROUTE(app,"/")([](){
        return std::format("Hello world\nThis hardware have {} threads.",std::thread::hardware_concurrency());
    });

    CROW_ROUTE(app,"/index")([&](){
        return index_page;
    });

    CROW_CATCHALL_ROUTE(app)([](){
        return "404 not found";
    });

    app.port(18080)
        .multithreaded()
        .run();
}