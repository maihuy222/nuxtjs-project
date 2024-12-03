<!-- npm install axios -->
<!-- npm install -g json-server -->
<!-- npx json-server --watch db.json --port 3000 -->

<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email"
                    required />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" id="password" v-model="password" class="form-control"
                    placeholder="Enter your password" required />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>

        <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const router = useRouter();

const handleLogin = async () => {
    try {
        const response = await axios.get("http://localhost:3000/users");
        const user = response.data.find(
            (u) => u.email === email.value && u.password === password.value
        );

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            alert("Login successful!");
            router.push("/");
        } else {
            errorMessage.value = "Invalid email or password.";
        }
    } catch (error) {
        console.error(error);
        errorMessage.value = "Failed to connect to the server.";
    }
};


</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
</style>