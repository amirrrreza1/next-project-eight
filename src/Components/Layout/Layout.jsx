const ROUTES = [
  { name: "Home", href: "/" },
  { name: "Quiz", href: "/quiz" },
  { name: "Login", href: "/login" },
  {name : "Dash" , href: "/dashboard"}
];

const Layout = ({ children }) => {
  return (
    <>
      <header className="sticky top-0 w-full bg-black h-[60px]  text-white">
        <div className="flex justify-center items-center gap-5 h-full">
          {ROUTES.map((route) => (
            <a
              key={route.name}
              href={route.href}
              className={route.name === ROUTES[0].name ? "active" : ""}
            >
              {route.name}
            </a>
          ))}
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
