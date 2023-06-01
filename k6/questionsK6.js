import http from 'k6/http';  // eslint-disable-line
import { check, sleep } from 'k6';  // eslint-disable-line

export const options = {
  stages: [
    { duration: '1s', target: 1000 },
    { duration: '28s', target: 1500 },
    { duration: '1s', target: 1000 },
  ],
};

export default () => {
  const randomNum = Math.floor(Math.random() * 1000 + 900000);
  const res = http.get(
    http.url`http://localhost:3000/qa/questions?product_id=${randomNum}&count=100&page=1`,
  );
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
};
