// app/page.tsx - MINIMAL WORKING VERSION
export const metadata = {
  title: 'Table & Plate - Private Chef Platform',
  description: 'Book private chefs in South Africa',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Simple Header */}
      <header className="border-b border-gray-800 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-light text-white">Table & Plate</h1>
          <nav className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Find a Chef</a>
            <a href="#" className="hover:text-white">Support</a>
            <a href="#" className="hover:text-white">Become a Chef</a>
          </nav>
        </div>
      </header>

      {/* Simple Hero */}
      <main className="px-8 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl font-bold text-white mb-6">
            Find Your Perfect Private Chef
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Luxury dining experiences in the comfort of your home
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Find Chefs
            </button>
            <button className="px-8 py-4 border border-gray-700 text-white rounded-lg hover:bg-gray-900 transition">
              Become a Chef
            </button>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-800 px-8 py-8 mt-32">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>Made with ❤️ in Cape Town, South Africa</p>
        </div>
      </footer>
    </div>
  );
}