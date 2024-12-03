<template>
  <div>
    <h1 class="mb-4 text-center text-primary">Quản lý Đơn hàng</h1>

    <!-- Bảng đơn hàng -->
    <table class="table table-striped table-bordered table-hover shadow-sm rounded">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Tên khách hàng</th>
          <th>Sản phẩm</th>
          <th>Ngày đặt hàng</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td> <!-- Hiển thị tên khách hàng từ API -->
          <td>
            <ul>
              <li v-for="(product, index) in order.products" :key="index">{{ product }}</li>
            </ul>
          </td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="editOrder(order.id)">Sửa</button>
            <button class="btn btn-danger btn-sm" @click="deleteOrder(order.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Thêm/Sửa Đơn hàng -->
    <button class="btn btn-primary mt-3" @click="showModal = true">Thêm đơn hàng</button>

    <!-- Modal -->
    <div class="modal fade show" tabindex="-1" v-if="showModal" style="display: block; background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-3 shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title">Thông tin Đơn hàng</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="customerName" class="form-label">Tên khách hàng</label>
              <input type="text" id="customerName" class="form-control" v-model="newOrder.customerName" />
            </div>
            <div class="mb-3">
              <label for="products" class="form-label">Sản phẩm</label>
              <textarea id="products" class="form-control" v-model="newOrder.products" placeholder="Nhập tên sản phẩm, cách nhau bằng dấu phẩy"></textarea>
            </div>
            <div class="mb-3">
              <label for="orderDate" class="form-label">Ngày đặt hàng</label>
              <input type="date" id="orderDate" class="form-control" v-model="newOrder.orderDate" />
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">Trạng thái</label>
              <select id="status" class="form-control" v-model="newOrder.status">
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Hủy</button>
            <button class="btn btn-primary" @click="saveOrder">Lưu</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const orders = ref([]);
    const showModal = ref(false);
    const newOrder = ref({ id: null, customerName: '', products: '', orderDate: '', status: 'Đang xử lý' });

    // Lấy dữ liệu từ API (hoặc tệp JSON)
    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders'); // API giả lập, trả về dữ liệu bao gồm tên khách hàng
        orders.value = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    });

    const saveOrder = async () => {
      if (newOrder.value.id) {
        const index = orders.value.findIndex((o) => o.id === newOrder.value.id);
        if (index !== -1) {
          orders.value[index] = { ...newOrder.value, products: newOrder.value.products.split(',').map(p => p.trim()) };
          await axios.put(`http://localhost:3000/orders/${newOrder.value.id}`, orders.value[index]);
        }
      } else {
        const newId = orders.value.length ? Math.max(...orders.value.map(o => o.id)) + 1 : 1;
        const newOrderData = {
          ...newOrder.value,
          id: newId,
          products: newOrder.value.products.split(',').map(p => p.trim()),
        };
        orders.value.push(newOrderData);
        await axios.post('http://localhost:3000/orders', newOrderData);
      }
      closeModal();
    };

    const editOrder = (id) => {
      const order = orders.value.find((o) => o.id === id);
      if (order) {
        newOrder.value = { ...order, products: order.products.join(', ') };
        showModal.value = true;
      }
    };

    const deleteOrder = async (id) => {
      orders.value = orders.value.filter((order) => order.id !== id);
      await axios.delete(`http://localhost:3000/orders/${id}`);
    };

    const closeModal = () => {
      newOrder.value = { id: null, customerName: '', products: '', orderDate: '', status: 'Đang xử lý' };
      showModal.value = false;
    };

    return { orders, showModal, newOrder, saveOrder, editOrder, deleteOrder, closeModal };
  },
};
</script>

<style scoped>
table {
  margin-top: 20px;
}

table th, table td {
  text-align: center;
}

.modal .modal-content {
  border-radius: 12px;
}

.modal .form-label {
  font-weight: bold;
}

.modal-header {
  background-color: #007bff;
  color: white;
}

.modal-footer .btn {
  padding: 8px 20px;
}

button {
  margin-right: 10px;
}
</style>
