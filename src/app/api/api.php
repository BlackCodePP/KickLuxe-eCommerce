<?php
  header("Access-Control-Allow-Origin: http://localhost:4200");
  header("Access-Control-Allow-Headers: Content-Type");
  header('Content-Type: application/json');

  define("INPUT_STREAM", "php://input");
  
  // Introducir los datos de conexión a la base de datos
  $servername = "";
  $username = "";
  $password = "";
  $dbname = "";

  // Crear conexión
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Verificar conexión
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Verificar la ruta de la API
  $path = $_SERVER['PATH_INFO'];
  if ($path == '/login') {
    login($conn);
  }elseif ($path == '/products'){
    brand($conn);
  }elseif ($path == '/register') {
    register($conn);
  }elseif ($path == '/order') {
    insertOrder($conn);
  }elseif (preg_match('#^/order/user/(\d+)$#', $path, $matches)) {
    getOrdersByUser($conn, $matches[1]);
  }

  // Función para obtener los productos por marca
  function brand($conn) {
    if (isset($_GET['brand'])) {
      $brand = $_GET['brand'];
      $stmt = $conn->prepare("SELECT * FROM productos WHERE marca = ?");
      $stmt->bind_param('s', $brand);
    } else {
      $stmt = $conn->prepare("SELECT * FROM productos");
    }

    $stmt->execute();
    $result = $stmt->get_result();
    $products = array();

    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $products[] = $row;
      }
    } else {
      echo "0 results";
    }
    echo json_encode($products);
  }

  function validateEmail($email) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      return "Formato de email incorrecto";
    }
    return null;
  }
  
  function validateUsername($username) {
    if (strlen($username) < 4 || strlen($username) > 20) {
      return "El nombre de usuario debe tener entre 4 y 20 caracteres";
    }
    return null;
  }
  
  function validatePassword($password) {
    if (!preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/", $password)) {
      return "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número";
    }
    return null;
  }

  // Funcion para obtener un usuario por ID
  function getUserById($conn, $id) {
    $stmt = $conn->prepare('SELECT * FROM clientes WHERE id = ?');
    $stmt->bind_param('i', $id);
  
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
  
    if ($user) {
      // No debe devolver la contraseña cifrada al cliente
      unset($user['password']);
    }
    $stmt->close();
    return $user;
  }

  // Funcion para loguear un usuario
  function login($conn) {
    // Leer los datos de login del cuerpo de la solicitud
    $data = json_decode(file_get_contents(INPUT_STREAM), true);

    if (isset($data['email']) && isset($data['password'])) {
      $email = $data['email'];
      $password = $data['password'];

      $stmt = $conn->prepare('SELECT * FROM clientes WHERE email = ?');
      $stmt->bind_param('s', $email);

      $stmt->execute();
      $result = $stmt->get_result();
      $user = $result->fetch_assoc();

      if ($user && password_verify($password, $user['password'])) {
        unset($user['password']);
        echo json_encode(['data' => $user, 'error' => null]);
      } else {
        echo json_encode(['data' => null, 'error' => 'No existen usuarios con esas credenciales de acceso']);
      }
      $stmt->close();
    }
  }

  // Funcion para registrar un usuario
  function register($conn) {
    // Leer los datos de registro del cuerpo de la solicitud
    $data = json_decode(file_get_contents(INPUT_STREAM), true);

    if (isset($data['email']) && isset($data['username']) && isset($data['password'])) {
      $email = $data['email'];
      $username = $data['username'];
      $password = $data['password'];
              
      // Validar el email
      $emailError = validateEmail($email);
      if ($emailError) {
        echo json_encode(["error" => $emailError]);
        return;
      }

      // Validar el nombre de usuario
      $usernameError = validateUsername($username);
      if ($usernameError) {
        echo json_encode(["error" => $usernameError]);
        return;
      }

      // Validar la contraseña
      $passwordError = validatePassword($password);
      if ($passwordError) {
        echo json_encode(["error" => $passwordError]);
        return;
      }
              
      $stmt = $conn->prepare("SELECT * FROM clientes WHERE email = ? OR nombre = ?");
      $stmt->bind_param('ss', $email, $username);

      $stmt->execute();
      $result = $stmt->get_result();
              
      if ($result->num_rows > 0) {
        echo json_encode(["error" => "Ya existe un usuario con ese email o nombre de usuario"]);
      } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO clientes (email, nombre, password) VALUES (?, ?, ?)");
        $stmt->bind_param('sss', $email, $username, $hashed_password);

      if ($stmt->execute() === true) {
        // Obtener el ID del usuario recién insertado
        $user_id = $stmt->insert_id;
        // Obtener los datos del usuario buscando por ID
        $user = getUserById($conn, $user_id);

        if ($user) {
          unset($user['password']);
          echo json_encode(['data' => $user, 'success' => 'Usuario registrado correctamente']);
        } else {
          echo json_encode(['error' => 'Error obteniendo los datos del usuario']);
        }
        $stmt->close();
      } else {
        echo json_encode(["error" => "Error registrando usuario: " . $conn->error]);
      }
      }
    }
  }

  // Funcion para insertar los detalles de un pedido
  function insertOrderDetails($conn, $pedido_id, $productos) {
    $stmt = $conn->prepare("INSERT INTO detalle_pedido (pedido_id, producto_id, talla) VALUES (?, ?, ?)");
  
    foreach ($productos as $producto) {
      if (isset($producto['id']) && isset($producto['talla'])) {
        $producto_id = $producto['id'];
        $talla = $producto['talla'];
  
        $stmt->bind_param('iis', $pedido_id, $producto_id, $talla);
        if ($stmt->execute() === false) {
          $stmt->close();
          return false;
        }
      }
    }
    $stmt->close();
    return true;
  }

  // Funcion para insertar un pedido
  function insertOrder($conn) {
    $data = json_decode(file_get_contents(INPUT_STREAM), true);
        
    if (isset($data['cliente_id']) && isset($data['productos']) && isset($data['precio_total'])) {
      $cliente_id = $data['cliente_id'];
      $productos = $data['productos'];
      $precio_total = $data['precio_total'];
      $fecha = date('Y-m-d H:i:s');
          
      $conn->begin_transaction();
          
      $stmt = $conn->prepare("INSERT INTO pedidos (cliente_id, fecha, precio_total) VALUES (?, ?, ?)");
      $stmt->bind_param('isd', $cliente_id, $fecha, $precio_total);
          
      if ($stmt->execute() === true) {
        // Obtener el ID del pedido recién insertado
        $pedido_id = $stmt->insert_id;
        if (insertOrderDetails($conn, $pedido_id, $productos)) {
          $conn->commit();
          echo json_encode(['success' => 'Pedido insertado correctamente']);
        } else {
          $conn->rollback();
          echo json_encode(['error' => 'Error insertando el pedido: ' . $conn->error]);
        }
      } else {
        echo json_encode(['error' => 'Error insertando el pedido: ' . $conn->error]);
      }
      $stmt->close();
    }
  }

  // Funcion para obtener los pedidos de un usuario
  function getOrdersByUser($conn, $userId) {
    $stmt = $conn->prepare('SELECT pedidos.fecha, pedidos.precio_total, detalle_pedido.*, productos.* FROM pedidos INNER JOIN detalle_pedido ON pedidos.id = detalle_pedido.pedido_id INNER JOIN productos ON detalle_pedido.producto_id = productos.id WHERE pedidos.cliente_id = ?');
    $stmt->bind_param('i', $userId);
    
    $stmt->execute();
    $result = $stmt->get_result();
    $orders = array();
    
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $orderId = $row['pedido_id'];
        if (!isset($orders[$orderId])) {
          $orders[$orderId] = array(
            'fecha' => $row['fecha'],
            'pedido_id' => $orderId,
            'precio_total' => $row['precio_total'],
            'productos' => array()
          );
        }
        $orders[$orderId]['productos'][] = $row;
      }
    }
    
    if (empty($orders)) {
      echo json_encode(array());
    } else {
      echo json_encode(array_values($orders));
    }
  }



