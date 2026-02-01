import { useNavigate } from 'react-router-dom'
import LOGO from '../assests/images/usa-travel-symbols.webp'
import ProfileInfo from './Cards/ProfileInfo'
import SearchBox from './Input/SearchBox';
import { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  }

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  }

  return (
    <div className="sticky top-0 z-50 bg-surface-light dark:bg-surface-dark shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src={LOGO} alt="" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover" />
            <p className="text-lightCoral font-bold font-mountain text-xl sm:text-2xl">
              Timeless <span className="text-primary-light dark:text-primary-dark">Tale</span>
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <SearchBox
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
            <ThemeToggle />
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-text-light dark:text-text-dark"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <SearchBox
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar