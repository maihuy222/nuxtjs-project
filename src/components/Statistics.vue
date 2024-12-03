<template>
  <div class="statistics">
    <div class="container">
      <h1 class="mb-4">Overview</h1>
      
      <!-- Biểu đồ và số liệu tổng quan -->
      <div class="row mb-4">
        <div class="col-lg-4 col-md-6">
          <div class="card p-3">
            <h5>Daily Revenue</h5>
            <canvas id="revenueChart"></canvas>
            <p class="mt-2 text-success">$80.00</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card p-3">
            <h5>Daily Orders</h5>
            <canvas id="ordersChart"></canvas>
            <p class="mt-2 text-success">150 ↑</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="card p-3">
            <h5>New Customers</h5>
            <canvas id="customersChart"></canvas>
            <p class="mt-2 text-success">11,000.00% ↑</p>
          </div>
        </div>
      </div>
      
      <!-- Đơn hàng gần đây -->
      <div class="row">
        <div class="col-lg-6">
          <div class="card p-3">
            <h5>Recent Orders</h5>
            <ul class="list-group">
              <li class="list-group-item">
                <strong>#10</strong> - Mai Hữu Huy - Edamame x1 - $25.00
              </li>
              <li class="list-group-item">
                <strong>#20</strong> - Nguyễn Cửu Bình - Apple Pie x1, Tea x1 - $18.00
              </li>
              <li class="list-group-item">
                <strong>#30</strong> - Phạm Đình Nhân - Coffee x1 - $14.00
              </li>
            </ul>
          </div>
        </div>

        <!-- Sản phẩm xu hướng -->
        <div class="col-lg-6">
          <div class="card p-3">
            <h5>Trending Products</h5>
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Coffee <span class="badge bg-primary">50 orders</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Cheeseburger <span class="badge bg-primary">35 orders</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "Statistics",
  setup() {
    // Tạo biểu đồ khi component được mount
    onMounted(() => {
      // Revenue chart
      new Chart(document.getElementById("revenueChart"), {
        type: "line",
        data: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "Revenue",
              data: [50000, 70000, 100000, 80000, 120000, 150000, 140000],
              borderColor: "blue",
              tension: 0.4,
            },
          ],
        },
      });

      // Orders chart
      new Chart(document.getElementById("ordersChart"), {
        type: "bar",
        data: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "Orders",
              data: [10, 20, 30, 40, 50, 60, 45],
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
          ],
        },
      });

      // Customers chart
      new Chart(document.getElementById("customersChart"), {
        type: "bar",
        data: {
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              label: "Customers",
              data: [5, 10, 20, 30, 40, 50, 60],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
          ],
        },
      });
    });
  },
};
</script>

<style>
/* Sử dụng Google Font đẹp */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

.statistics .card {
  border: none;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
}

.statistics h5 {
  font-weight: 500;
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.statistics .list-group-item {
  border: none;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistics .list-group-item:hover {
  background-color: #ececec;
  transition: background-color 0.3s ease;
}

.statistics .badge {
  font-size: 14px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border-radius: 20px;
}

.statistics .badge.bg-primary {
  background-color: #ff8c00 !important;
}

.statistics .text-success {
  color: #28a745 !important;
  font-weight: 500;
}

.statistics h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #333;
}

/* Biểu đồ */
canvas {
  max-height: 200px;
}

/* Đổ bóng cho tiêu đề card */
.card h5 {
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>

