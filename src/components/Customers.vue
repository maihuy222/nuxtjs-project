<template>
  <div>
    <h1 class="mb-4 text-center text-primary">Quản lý Khách hàng</h1>

    <!-- Bảng khách hàng -->
    <table class="table table-striped table-bordered table-hover shadow-sm rounded">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Tên khách hàng</th>
          <th>Địa chỉ</th>
          <th>Lịch sử mua hàng</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.address }}</td>
          <td>
            <ul>
              <li v-for="(order, index) in customer.purchaseHistory" :key="index">
                {{ order }}
              </li>
            </ul>
          </td>
          <td>
            <button class="btn btn-warning btn-sm" @click="editCustomer(customer.id)">Sửa</button>
            <button class="btn btn-danger btn-sm" @click="deleteCustomer(customer.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Thêm/Sửa Khách hàng -->
    <button class="btn btn-primary mt-3" @click="showModal = true">Thêm khách hàng</button>

    <!-- Modal -->
    <div class="modal fade show" tabindex="-1" v-show="showModal" style="display: block; background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-3 shadow-lg">
          <div class="modal-header">
            <h5 class="modal-title">Thông tin khách hàng</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Tên khách hàng</label>
              <input type="text" id="name" class="form-control" v-model="newCustomer.name" />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Địa chỉ</label>
              <input type="text" id="address" class="form-control" v-model="newCustomer.address" />
            </div>
            <div class="mb-3">
              <label for="history" class="form-label">Lịch sử mua hàng</label>
              <textarea id="history" class="form-control" v-model="newCustomer.purchaseHistory" placeholder="Nhập lịch sử mua hàng, mỗi mục cách nhau bằng dấu phẩy"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Hủy</button>
            <button class="btn btn-primary" @click="saveCustomer">Lưu</button>
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
    const customers = ref([]);
    const showModal = ref(false);
    const newCustomer = ref({ id: null, name: '', address: '', purchaseHistory: '' });

    // Lấy danh sách khách hàng từ API khi component được mount
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/customers');
        customers.value = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu khách hàng:', error);
      }
    };

    // Thêm hoặc cập nhật khách hàng
    const saveCustomer = async () => {
      if (newCustomer.value.id) {
        try {
          // Chuyển purchaseHistory thành mảng nếu nó là chuỗi
          const purchaseHistoryArray = newCustomer.value.purchaseHistory.split(',').map(item => item.trim());
          await axios.put(`http://localhost:3000/customers/${newCustomer.value.id}`, { 
            ...newCustomer.value, 
            purchaseHistory: purchaseHistoryArray
          });
          fetchCustomers(); // Lấy lại danh sách sau khi cập nhật
        } catch (error) {
          console.error('Lỗi khi cập nhật khách hàng:', error);
        }
      } else {
        try {
          // Tạo khách hàng mới và lấy ID tự động từ API JSON
          const purchaseHistoryArray = newCustomer.value.purchaseHistory.split(',').map(item => item.trim());
          await axios.post('http://localhost:3000/customers', {
            ...newCustomer.value,
            purchaseHistory: purchaseHistoryArray,
          });
          fetchCustomers(); // Lấy lại danh sách sau khi thêm mới
        } catch (error) {
          console.error('Lỗi khi thêm khách hàng:', error);
        }
      }
      closeModal();
    };

    // Chỉnh sửa khách hàng
    const editCustomer = (id) => {
      const customer = customers.value.find((c) => c.id === id);
      if (customer) {
        newCustomer.value = { 
          ...customer, 
          purchaseHistory: customer.purchaseHistory.join(', ') // Chuyển purchaseHistory thành chuỗi để chỉnh sửa
        };
        showModal.value = true;
      }
    };

    // Xóa khách hàng
   // Xóa khách hàng
const deleteCustomer = async (id) => {
  try {
    // Đảm bảo bạn truyền đúng ID trong URL
    await axios.delete(`http://localhost:3000/customers/${id}`);
    fetchCustomers(); // Lấy lại danh sách sau khi xóa
  } catch (error) {
    console.error('Lỗi khi xóa khách hàng:', error);
  }
};



    // Đóng modal
    const closeModal = () => {
      newCustomer.value = { id: null, name: '', address: '', purchaseHistory: '' };
      showModal.value = false;
    };

    // Lấy danh sách khách hàng khi component được mount
    onMounted(fetchCustomers);

    return { customers, showModal, newCustomer, saveCustomer, editCustomer, deleteCustomer, closeModal };
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
