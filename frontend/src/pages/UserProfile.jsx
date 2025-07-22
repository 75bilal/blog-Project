import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Herosection from "../components/Herosection";
import Posts from "../components/Posts";

const user = {
  name: "John Doe",
  dp: "https://randomuser.me/api/portraits/men/32.jpg",
  bio: "Writer & Security Specialist. Sharing insights on security and technology.",
};

const UserProfile = () => {
  const [post, setPost] = useState([]);
  const [user, setUseruser] = useState({});
  async function fetchUserPost() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/api/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include", // 🟢 Include cookies (auth)
      });

      const data = await res.json();
      if (res.ok) {
        setPost(data?.posts || []);
        setUseruser(data?.user || {});
        console.log("Fetched Posts:", data);
      } else {
        console.log("Failed to access posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    fetchUserPost();
  }, []);

  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="bg-[#0e121e] min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="flex pt-[60px] w-full">
        <Sidebar />
        <div className="flex-1 w-1/2 md:ml-28 sm:mx-auto px-4">
          
          {/* User Profile Section */}

<div className="flex justify-center items-center mt-8">
  <div className="w-full max-w-xl rounded-xl shadow-xl p-6 flex flex-col items-center">
    <div className="flex items-start gap-6 w-full">
      <img
        src={user.dp || "https://randomuser.me/api/portraits/men/32.jpg"}
        alt="User DP"
        className="w-24 h-24 rounded-full border-4 shadow-lg object-cover"
      />
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-white">{user.name}</h2>
        <p className="text-white mt-2 max-w-md break-words">
          {user.bio || "This user hasn't added a bio yet."}
        </p>
      </div>
    </div>

    <button className="bg-blue-500 w-full mt-4 font-bold text-lg text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
      Subscribe
    </button>
  </div>
</div>



          {/* Tabs */}
          <div className="mt-4 max-w-lg mx-auto">
            <div className="flex flex-row items-center mb-4 justify-around border-b border-gray-500 gap-8">
              {["Posts", "Activity", "Likes"].map((tab) => (
                <h3
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-lg font-semibold cursor-pointer pb-2 transition-all duration-400
                    ${
                      activeTab === tab
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 border-b-2 border-transparent hover:text-white"
                    }`}
                >
                  {tab}
                </h3>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === "Posts" && <Posts posts={post} />}
              {activeTab === "Activity" && (
                <div className="text-white">No activity yet.</div>
              )}
              {activeTab === "Likes" && (
                <div className="text-white">No likes available.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
