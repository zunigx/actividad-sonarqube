import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10, // 10 usuarios virtuales
  duration: '30s', // duración de la prueba
  thresholds: {
    http_req_duration: ['p(95)<500'], // El 95% de las peticiones deben bajar de 500ms
  },
};

export default function () {
  const res = http.get('http://app-node:3000/');
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}