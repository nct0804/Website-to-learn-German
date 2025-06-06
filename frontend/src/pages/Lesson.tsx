// src/pages/Home.tsx
export default function Lesson() {
  return (
    <div className="bg-white rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Hello from Lesson</h1>
      <p>Nội dung trang Lesson. Header nằm cố định ở trên, sidebar bên trái.</p>
      <p>Cuộn trang thử, chỉ nội dung ở đây cuộn, header không di chuyển.</p>
      <div style={{ height: '800px' }} className="mt-4 bg-gray-50">
        <p className="p-4">Đây là phần nội dung dài để bạn scroll. Lorem ipsum...</p>
      </div>
    </div>
  );
}