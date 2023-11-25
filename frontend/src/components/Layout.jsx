import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2023 Survey Champs</p>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
