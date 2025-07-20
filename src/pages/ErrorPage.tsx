import { Link } from 'react-router'

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-4">Halaman tidak ditemukan</p>
        <Link to="/" className="text-primary-500 hover:underline">
          Kembali ke beranda
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage