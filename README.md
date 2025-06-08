ý tưởng khi có package.json ở main root là dễ dàng có thể chạy run cho 2 folders backend và frontend cùng một lúc

Chỉ cần chạy lệnh npm start ở root mà ko cần phải vào từng folder để chạy lệnh (Without DOCKER!)
```
"start:frontend": "cd frontend && npm install && npm run dev"
"start:backend": "cd backend && npm install && npm run build && npm run start",
"start": "concurrently \"npm run start:backend\" \"npm run start:frontend\""

```

### Run app with Docker

(Temporarily empty).

### Run app for local development


1. Clone the git repository:
    ```
    git clone https://code.fbi.h-da.de/sttgleeee/fwe-lernplattform.git
    ```
2. Navigate to backend directory 
    ```
    cd backend
    npm install
    ```
    and create a .env file with following variables:
    ```
    DATABASE_URL="postgresql://germangains:germangains@localhost:5432/germangainsdb?schema=public"
    ```
3. Navigate to frontend directory 
    ```
    cd ../frontend
    npm install
    ```
    and create a .env file with following variables:
    ```

    ```

4. Install necessary packages and run both backend and frontend at project directory:
    ```
    cd ..
    npm install
    npm start
    ```
