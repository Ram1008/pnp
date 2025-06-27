import React from 'react'

const scrap = () => {
    
  // Sample data
  const orders = [
    {
      id: 1,
      product: "Business Cards",
      status: "Processing",
      date: "2 days ago",
    },
    { id: 2, product: "Stickers", status: "Shipped", date: "1 week ago" },
    { id: 3, product: "Posters", status: "Delivered", date: "2 weeks ago" },
  ];

  const notifications = [
    {
      id: 1,
      message: "Your order #123 has shipped",
      read: false,
      time: "2h ago",
    },
    { id: 2, message: "Referral bonus credited", read: true, time: "1d ago" },
    { id: 3, message: "New products added", read: true, time: "3d ago" },
  ];

  const referralStats = {
    totalEarned: 250,
    pending: 50,
    referrals: 5,
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };
  return (
    <div>
        

        {/* Orders Dropdown */}
        <div className="relative">
          <button
            className="flex flex-col items-center px-1 sm:px-2 text-[10px] sm:text-xs"
            onClick={() => toggleDropdown("orders")}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 flex items-center justify-center text-gray-500">
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-medium text-[9px] sm:text-[10px]">
                Orders
              </span>
              {activeDropdown === "orders" ? (
                <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />
              ) : (
                <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />
              )}
            </div>
          </button>

          {activeDropdown === "orders" && (
            <div className="h-[370px] fixed sm:absolute top-12 left-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full sm:w-72 bg-white border border-gray-200 rounded-b-lg shadow-lg sm:mt-1 z-30 max-h-[50vh] overflow-y-auto">
              <div className="p-2 sm:p-3">
                <h3 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 flex items-center">
                  <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Recent Orders
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border-b pb-1 sm:pb-2 last:border-0"
                    >
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="font-medium truncate max-w-[120px] sm:max-w-none">
                          {order.product}
                        </span>
                        <span
                          className={`text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">
                        {order.date}
                      </div>
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-[10px] sm:text-xs text-teal-500 mt-0.5 sm:mt-1 block hover:underline"
                        onClick={closeDropdown}
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
                <Link
                  href="/orders"
                  className="text-[10px] sm:text-xs text-center block mt-1 sm:mt-2 text-teal-500 hover:underline"
                  onClick={closeDropdown}
                >
                  View All Orders
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            className="flex flex-col items-center px-1 sm:px-2 text-[10px] sm:text-xs"
            onClick={() => toggleDropdown("notifications")}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 flex items-center justify-center text-gray-500 relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></span>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-medium text-[9px] sm:text-[10px]">
                Notifications
              </span>
              {activeDropdown === "notifications" ? (
                <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />
              ) : (
                <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />
              )}
            </div>
          </button>

          {activeDropdown === "notifications" && (
            <div className="h-[370px] fixed sm:absolute top-12 left-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full sm:w-72 bg-white border border-gray-200 rounded-b-lg shadow-lg sm:mt-1 z-30 max-h-[50vh] overflow-y-auto">
              <div className="p-2 sm:p-3">
                <div className="flex justify-between items-center mb-1 sm:mb-2">
                  <h3 className="font-medium text-xs sm:text-sm flex items-center">
                    <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Notifications
                  </h3>
                  <button className="text-[10px] sm:text-xs text-teal-500 hover:underline">
                    Mark all as read
                  </button>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border-b pb-1 sm:pb-2 last:border-0 ${
                        !notification.read
                          ? "bg-blue-50 -mx-2 sm:-mx-3 px-2 sm:px-3 py-1 sm:py-2"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <p className="text-xs sm:text-sm line-clamp-2">
                          {notification.message}
                        </p>
                        {!notification.read && (
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full ml-1 sm:ml-2 flex-shrink-0 mt-0.5 sm:mt-1"></span>
                        )}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 flex justify-between items-center">
                        <span>{notification.time}</span>
                        {!notification.read && (
                          <button className="text-[10px] sm:text-xs text-blue-500 hover:underline">
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/notifications"
                  className="text-[10px] sm:text-xs text-center block mt-1 sm:mt-2 text-teal-500 hover:underline"
                  onClick={closeDropdown}
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Refer & Earn Dropdown */}
        <div className="relative">
          <button
            className="flex flex-col items-center px-1 sm:px-2 text-[10px] sm:text-xs"
            onClick={() => toggleDropdown("refer")}
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 mb-0.5 sm:mb-1 flex items-center justify-center text-gray-500">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 font-medium text-[9px] sm:text-[10px]">
                Refer & Earn
              </span>
              {activeDropdown === "refer" ? (
                <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />
              ) : (
                <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" />
              )}
            </div>
          </button>

          {activeDropdown === "refer" && (
            <div className="h-[370px] fixed sm:absolute top-12 left-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-full sm:w-72 bg-white border border-gray-200 rounded-b-lg shadow-lg sm:mt-1 z-30">
              <div className="p-2 sm:p-3">
                <h3 className="font-medium text-xs sm:text-sm mb-2 sm:mb-3 flex items-center">
                  <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Your Referral Program
                </h3>

                <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-2 sm:mb-3 text-center">
                  <div className="bg-blue-50 p-1 sm:p-2 rounded">
                    <div className="text-[10px] sm:text-xs text-gray-500">
                      Earned
                    </div>
                    <div className="font-bold text-teal-600 text-xs sm:text-sm">
                      ₹{referralStats.totalEarned}
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-1 sm:p-2 rounded">
                    <div className="text-[10px] sm:text-xs text-gray-500">
                      Pending
                    </div>
                    <div className="font-bold text-yellow-600 text-xs sm:text-sm">
                      ₹{referralStats.pending}
                    </div>
                  </div>
                  <div className="bg-green-50 p-1 sm:p-2 rounded">
                    <div className="text-[10px] sm:text-xs text-gray-500">
                      Referrals
                    </div>
                    <div className="font-bold text-green-600 text-xs sm:text-sm">
                      {referralStats.referrals}
                    </div>
                  </div>
                </div>

                <div className="mb-2 sm:mb-3">
                  <div className="text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1">
                    Your Referral Code:
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value="PRINT50"
                      readOnly
                      className="border border-gray-300 rounded-l px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm flex-grow bg-gray-50"
                    />
                    <button className="bg-teal-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-r text-xs sm:text-sm hover:bg-teal-600">
                      Copy
                    </button>
                  </div>
                </div>

                <Link
                  href="/refer"
                  className="block w-full bg-teal-500 text-white text-center py-1 sm:py-2 rounded text-xs sm:text-sm hover:bg-teal-600"
                  onClick={closeDropdown}
                >
                  Invite Friends
                </Link>
              </div>
              {/* add friends suggestion */}
              <div className="p-2 sm:p-3">
                <h3 className="font-medium text-xs sm:text-sm mb-2 sm:mb-3 flex items-center">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Friend Suggestions
                </h3>

                {/* show dummy friend (name, image) */}
                <div className="grid grid-cols-3 gap-1 sm:gap-2">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                      alt="Friend"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                    <div className="ml-2">
                      <div className="text-xs sm:text-sm font-medium">
                        John Doe
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500">
                        5 mutual friends
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2 sm:mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                      alt="Friend"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                    <div className="ml-2">
                      <div className="text-xs sm:text-sm font-medium">
                        John Doe
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500">
                        5 mutual friends
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2 sm:mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                      alt="Friend"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                    <div className="ml-2">
                      <div className="text-xs sm:text-sm font-medium">
                        John Doe
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500">
                        5 mutual friends
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mb-2 sm:mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                      alt="Friend"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                    />
                    <div className="ml-2">
                      <div className="text-xs sm:text-sm font-medium">
                        John Doe
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-500">
                        5 mutual friends
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Overlay with blur effect */}
      {activeDropdown && (
        <div
          className="mt-12 fixed inset-0 z-20 space-y-4 bg-black/50"
          onClick={closeDropdown}
        />
      )}
      
    </div>
  )
}

export default scrap
