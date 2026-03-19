<?php

namespace App;  

class Router {
    private array $routes = [];

    public function __construct() {}

    public function register(string $uri, array $methods, string $controller, string $action): self {
        $handler = [new $controller, $action];
        $methods = array_map(fn($item) => strtoupper($item), $methods);

        $this->routes[] = ['uri' => $uri, 'methods' => $methods, 'handler' => $handler];
        return $this;
    }

    public function resolve(string $uri, string $method): void {
        $method = strtoupper($method);
        $uri = explode('?', $uri)[0];

        foreach($this->routes as $route) {
            if($route['uri'] === $uri) {
                if(in_array($method, $route['methods'])) {
                    call_user_func($route['handler']);
                    return;
                }
                else {
                    $allowed = implode(' ', $route['methods']);

                    header('http/1.1 405 Method Not Allowed');
                    header('Allow: ' . $allowed);
                    return;
                }
            }
        }
        header('http/1.1 404 Page Not Found');
    }
}