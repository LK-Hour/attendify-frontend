export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-slate-900 dark:border-slate-800 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Attendify. Built with ❤️ at CADT.
            </p>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
