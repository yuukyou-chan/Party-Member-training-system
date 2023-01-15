import { Message } from "element-ui";
import router from "../router";
import axios from "axios";
import Vue from "vue";

const reuqest = axios.create({
  // 加了斜杠，前缀默认为域名地址
  baseURL: process.env.VUE_APP_BASE_URL || ""
});

reuqest.interceptors.request.use(
  function(config) {
    if (localStorage.token) {
      config.headers.Authorization = `Bearer ${localStorage.token}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

reuqest.interceptors.response.use(
  res => {
    // Any status code that lie within the range of 2xx cause this function to trigger

    const { code } = res.data;

    console.log(code, res, res.data.code, res.data.message);

    if (code === 500) {
      const { message } = res.data;
      if (message) {
        // Message.error(message);
        Vue.prototype.$message.error(message);
      }
    } else if (code === 401) {
      router.push("/login");
    }

    return res.data;
  },
  err => {
    const code = err.response.status;
    if (code === 401) {
      Vue.prototype.$message.error({
        type: "error",
        message: "身份认证过期，请重新登陆"
      });
      router.push("/login");
    } else if (code === 500) {
      Vue.prototype.$message.error(err.response.message);
    } else {
      Vue.prototype.$message.error({
        type: "error",
        message: err.response.data.message
      });
    }
    return Promise.reject(err);
  }
);

export default reuqest;
