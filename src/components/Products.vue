<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Products</h2>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" @click="prepareToAdd">
        Add new product
      </button>
    </div>

    <!-- Table -->
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">ID #</th>
          <th scope="col">Images</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Category</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>#{{ product.id }}</td>
          <td><img :src="product.image" alt="Product" class="img-thumbnail" style="width: 50px; height: 50px;" /></td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>${{ product.price.toFixed(2) }}</td>
          <td>{{ product.category }}</td>
          <td>
            <span
              class="badge"
              :class="product.status === 'Available' ? 'bg-success' : 'bg-secondary'">
              {{ product.status }}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-warning me-2" data-bs-toggle="modal" data-bs-target="#productModal" @click="prepareToEdit(product)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteProduct(product.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal for Add/Edit -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="productModalLabel">{{ isEditing ? "Edit Product" : "Add New Product" }}</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveProduct">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" class="form-control" v-model="form.name" required />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" class="form-control" v-model="form.description" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="number" id="price" class="form-control" v-model="form.price" required />
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <input type="text" id="category" class="form-control" v-model="form.category" required />
              </div>
              <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" class="form-select" v-model="form.status" required>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">Image URL</label>
                <input type="text" id="image" class="form-control" v-model="form.image" />
              </div>
              <button type="submit" class="btn btn-primary w-100">
                {{ isEditing ? "Update Product" : "Add Product" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "ProductManager",
  setup() {
    const products = ref([]);
    const isEditing = ref(false);
    const form = ref({
      id: null,  // Không cần phải cung cấp id ở đây
      name: "",
      description: "",
      price: null,
      category: "",
      status: "Available",
      image: "",
    });
    
    const API_URL = 'http://localhost:3000/products';

    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        products.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Add or Update product
    const saveProduct = async () => {
      try {
        if (isEditing.value) {
          await axios.put(`${API_URL}/${form.value.id}`, form.value);
        } else {
          await axios.post(API_URL, form.value);  // Không cần phải đưa `id` vào
        }
        fetchProducts();
      } catch (error) {
        console.error("Error saving product:", error);
      }
    };

    // Delete product
    const deleteProduct = async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

    // Prepare to add a product
    const prepareToAdd = () => {
      isEditing.value = false;
      form.value = {
        id: null,  // Đảm bảo id là null khi thêm sản phẩm mới
        name: "",
        description: "",
        price: null,
        category: "",
        status: "Available",
        image: "",
      };
    };

    // Prepare to edit a product
    const prepareToEdit = (product) => {
      isEditing.value = true;
      form.value = { ...product };
    };

    fetchProducts();

    return {
      products,
      form,
      isEditing,
      prepareToAdd,
      prepareToEdit,
      saveProduct,
      deleteProduct,
    };
  },
};
</script>

<style>
.img-thumbnail {
  border-radius: 5px;
}
</style>
