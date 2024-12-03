<template>
  <div id="app" class="d-flex">
    <!-- Sidebar -->
    <nav class="sidebar bg-light vh-100 p-3">
      <h3 class="text-primary mb-4">Quản lý</h3>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/products" class="nav-link d-flex align-items-center">
            <i class="bi bi-box me-2"></i>
            Quản lý Sản phẩm
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/orders" class="nav-link d-flex align-items-center">
            <i class="bi bi-cart me-2"></i>
            Quản lý Đơn hàng
          </router-link>
  </li>
        <li class="nav-item">
          <router-link to="/Login" class="nav-link d-flex align-items-center">
            <i class="bi bi-cart me-2"></i>
            Login
          </router-link>
       


        </li>
        <li class="nav-item">
          <router-link to="/customers" class="nav-link d-flex align-items-center">
            <i class="bi bi-people me-2"></i>
            Quản lý Khách hàng
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/statistics" class="nav-link d-flex align-items-center">
            <i class="bi bi-bar-chart me-2"></i>
            Thống kê
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <div class="content flex-grow-1 p-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Sidebar Styling */
.sidebar {
  width: 250px;
  border-right: 1px solid #ddd;
}
.sidebar h3 {
 color: aqua;
  font-size: 1.5rem;
  font-weight: bold;
}
.sidebar .nav-link {
  color: #333;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s;
}
.sidebar .nav-link:hover {
  background-color: #da8d40;
  color: #fff;
}
.sidebar .nav-link.active {
  background-color: #eee7eb;
  color: #fff;
}

/* Content Styling */
.content {
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>
