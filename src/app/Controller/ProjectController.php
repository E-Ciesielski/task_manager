<?php
namespace App\Controller;

use App\Database;
use App\Validator;

class ProjectController {
    public function index(): void {
        $db = Database::getDb();
        $stmt = $db->query('SELECT * FROM projects');
        $projects = $stmt->fetchAll();
        $this->render('project/index.php', ['projects' => $projects]);
    }

    public function store(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        if($method === 'POST') {
            $name = $_POST['name'];
            $description = $_POST['description'];

            $validator = new Validator();
            $validator->validate($name, 'name', [Validator::required(), Validator::minLength(3), Validator::maxLength(100)]);
            $validator->validate($description, 'description', [Validator::required(), Validator::maxLength(1000)]);
            
            if(!$validator->isValid()) {
                $this->render('project/store.php', ['errors' => $validator->getErrors()]);
                return;
            }

            $db = Database::getDb();
            $prep = $db->prepare('INSERT INTO projects(name, description) Values(?,?)');
            $prep->execute([$name, $description]);

            header('Location: /');
            return;
        }
        $this->render('project/store.php');
    }

    private function render(string $view, array $props = []): void {
        require __DIR__ . '/../View/header.php';  
        require __DIR__ . '/../View/' . $view;  
        require __DIR__ . '/../View/footer.php';  
    }
}