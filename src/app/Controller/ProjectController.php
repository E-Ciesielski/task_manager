<?php
namespace App\Controller;

class ProjectController {
    public function index(): void {
        $this->render('project/index.php');
    }

    private function render(string $view): void {
        include __DIR__ . '/../View/' . $view;  
    }
}