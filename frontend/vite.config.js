import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // Proxy 설정
        proxy: {
          // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
          '/api': {
            // 요청 전달 대상 서버 주소 설정: fastapi 사용 포트
            target: 'http://localhost:8000',
            // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경 //TODO 이게뭐임
            changeOrigin: true,
            // 요청 경로에서 '/api' 제거 
            rewrite: (path) => path.replace(/^\/api/, ''),
            // SSL 인증서 검증 무시
            secure: false,
            // WebSocket 프로토콜 사용
            ws: true,
          },
        },
});
