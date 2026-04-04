<template>
  <div class="register-page">
    <div class="register-form">
      <h4>Đăng ký tài khoản</h4>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Tên đăng nhập</label>
          <input v-model="userLocal.username" type="text" class="form-control" required />
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <input v-model="userLocal.password" type="password" class="form-control" required />
        </div>

        <div class="form-group">
          <label>Nhập lại mật khẩu</label>
          <input v-model="confirmPassword" type="password" class="form-control" required />
        </div>

        <button class="btn btn-success w-100 mt-3">Đăng ký</button>
      </form>

      <p class="text-danger" v-if="passwordError">{{ passwordError }}</p>
      <p class="text-info">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.server";

export default {
  data() {
    return {
      userLocal: { username: "", password: "" },
      confirmPassword: "",
      message: "",
      passwordError: ""
    };
  },
  methods: {
    // src/views/Register.vue
    async handleRegister() {
      // Kiểm tra khớp mật khẩu trước khi gửi
      if (this.userLocal.password !== this.confirmPassword) {
        this.message = "Mật khẩu nhập lại không khớp!";
        return;
      }

      // Kiểm tra độ dài mật khẩu
      if (this.userLocal.password.length < 6) {
        this.message = "Mật khẩu phải có ít nhất 6 ký tự!";
        return;
      }

      // Kiểm tra username không rỗng
      if (!this.userLocal.username.trim()) {
        this.message = "Tên đăng nhập không được để trống!";
        return;
      }

      try {
        const payload = {
          username: this.userLocal.username,
          password: this.userLocal.password
        };

        console.log('Sending registration request:', payload);
        await AuthService.register(payload);
        console.log('Registration successful');
        this.message = "Đăng ký thành công!";
        setTimeout(() => this.$router.push("/login"), 2000);
      } catch (error) {
        console.error('Registration error:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        // Hiển thị chi tiết lỗi từ Backend (Ví dụ: "Username đã tồn tại")
        this.message = error.response?.data?.message || "Lỗi đăng ký (400)";
      }
    }
  }
};
</script>