// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">SPM</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>Naji Ali</li>
          <li>
            <a
              href="https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900"
            >
              Repo
            </a>
          </li>
          <li>
            <a
              href="https://github.com/YOUR_GITHUB_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
