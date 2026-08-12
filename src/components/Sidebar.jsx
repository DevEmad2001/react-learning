function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">
        StoreApp
      </h2>

      <nav className="sidebar-menu">
        <p>Dashboard</p>

        <p className="active">
          Products
        </p>

        <p>Orders</p>
        <p>Customers</p>
        <p>Categories</p>
        <p>Reports</p>
        <p>Settings</p>
      </nav>
    </aside>
  )
}

export default Sidebar