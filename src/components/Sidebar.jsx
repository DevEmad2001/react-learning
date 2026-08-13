import {
  ShoppingBag,
  House,
  Package,
  ShoppingCart,
  Users,
  Tag,
  ChartNoAxesColumnIncreasing,
  Settings
} from 'lucide-react'

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <ShoppingBag
          size={36}
          strokeWidth={2.5}
        />

        <h2>StoreApp</h2>
      </div>

      <nav className="sidebar-menu">

        <div className="sidebar-item">
          <House size={22} />
          <span>Dashboard</span>
        </div>

        <div className="sidebar-item active">
          <Package size={22} />
          <span>Products</span>
        </div>

        <div className="sidebar-item">
          <ShoppingCart size={22} />
          <span>Orders</span>
        </div>

        <div className="sidebar-item">
          <Users size={22} />
          <span>Customers</span>
        </div>

        <div className="sidebar-item">
          <Tag size={22} />
          <span>Categories</span>
        </div>

        <div className="sidebar-item">
          <ChartNoAxesColumnIncreasing size={22} />
          <span>Reports</span>
        </div>

        <div className="sidebar-item">
          <Settings size={22} />
          <span>Settings</span>
        </div>

      </nav>

    </aside>
  )
}

export default Sidebar