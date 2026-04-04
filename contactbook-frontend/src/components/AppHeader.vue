<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'contactbook' }" class="nav-link">
                    Danh bạ <i class="fas fa-address-book"></i>
                </router-link>
            </li>
        </div>
        
        <div v-if="!currentUser" class="navbar-nav ml-auto">
            <li class="nav-item">
                <router-link to="/register" class="nav-link">Đăng ký</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/login" class="nav-link">Đăng nhập</router-link>
            </li>
        </div>
        <div v-if="currentUser" class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" style="cursor: pointer" @click.prevent="logout">Đăng xuất</a>
            </li>
        </div>
    </nav>
</template>

<script>
import AuthService from "@/services/auth.server";
export default {
    computed: {
        currentUser() {
            return JSON.parse(localStorage.getItem("user"));
        }
    },
    methods: {
        logout() {
            AuthService.logout();
            this.$router.push({ name: "login" });
            location.reload();
        }
    }
};
</script>