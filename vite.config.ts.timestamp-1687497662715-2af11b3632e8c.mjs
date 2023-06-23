// vite.config.ts
import { defineConfig } from "file:///C:/Users/user/Desktop/WinkBook/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/user/Desktop/WinkBook/node_modules/@vitejs/plugin-react-swc/index.mjs";
import sassDts from "file:///C:/Users/user/Desktop/WinkBook/node_modules/vite-plugin-sass-dts/dist/index.js";
import mkcert from "file:///C:/Users/user/Desktop/WinkBook/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import path from "path";
var __dirname = path.resolve();
var vite_config_default = defineConfig({
  plugins: [react(), sassDts(), mkcert()],
  resolve: {
    alias: [{ find: "@", replacement: `${__dirname}/src` }]
  },
  server: {
    host: "teamwink.com",
    proxy: {
      "/cafe24": {
        target: "https://teamwink.cafe24api.com/api/v2",
        changeOrigin: true,
        secure: false,
        rewrite: (path2) => path2.replace(/^\/cafe24/, "")
      },
      "/iamport": {
        target: "https://api.iamport.kr/",
        changeOrigin: true,
        secure: false,
        rewrite: (path2) => path2.replace(/^\/iamport/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERlc2t0b3BcXFxcV2lua0Jvb2tcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxXaW5rQm9va1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdXNlci9EZXNrdG9wL1dpbmtCb29rL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHNhc3NEdHMgZnJvbSBcInZpdGUtcGx1Z2luLXNhc3MtZHRzXCI7XHJcbmltcG9ydCBta2NlcnQgZnJvbSBcInZpdGUtcGx1Z2luLW1rY2VydFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLnJlc29sdmUoKTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIHNhc3NEdHMoKSwgbWtjZXJ0KCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiBbeyBmaW5kOiBcIkBcIiwgcmVwbGFjZW1lbnQ6IGAke19fZGlybmFtZX0vc3JjYCB9XSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCJ0ZWFtd2luay5jb21cIixcclxuICAgIHByb3h5OiB7XHJcbiAgICAgIFwiL2NhZmUyNFwiOiB7XHJcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vdGVhbXdpbmsuY2FmZTI0YXBpLmNvbS9hcGkvdjJcIixcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvY2FmZTI0LywgXCJcIiksXHJcbiAgICAgIH0sXHJcbiAgICAgIFwiL2lhbXBvcnRcIjoge1xyXG4gICAgICAgIHRhcmdldDogXCJodHRwczovL2FwaS5pYW1wb3J0LmtyL1wiLFxyXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICBzZWN1cmU6IGZhbHNlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9pYW1wb3J0LywgXCJcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNSLFNBQVMsb0JBQW9CO0FBQ25ULE9BQU8sV0FBVztBQUNsQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sVUFBVTtBQUNqQixJQUFNLFlBQVksS0FBSyxRQUFRO0FBRy9CLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQ3RDLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFhLEdBQUcsZ0JBQWdCLENBQUM7QUFBQSxFQUN4RDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsV0FBVztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsYUFBYSxFQUFFO0FBQUEsTUFDakQ7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLGNBQWMsRUFBRTtBQUFBLE1BQ2xEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
