import React, { useEffect, useState } from "react";
import { FaRegHeart, FaRegComment, FaShare } from "react-icons/fa";
import { assets } from "../assets/assets"; // Replace with your avatar path
import Input from "./Input";

const Mainsection = () => {
  const [post, setPost] = useState([]);

  async function fetchPost() {
    try {
      const res = await fetch("http://localhost:3000/api/userpost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🟢 Include cookies (auth)
      });

      const data = await res.json();
      if (res.ok) {
        setPost(data?.data || []); // ✅ ensure data is set correctly
        console.log("Fetched Posts:", data);
      } else {
        console.log("Failed to access posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="flex flex-col items-center pt-4">
      {/* Input Box */}
      <Input />

      {/* Posts List */}
      {post.length > 0 ? (
        post.map((item, index) => (
          <div
            key={item._id || index}
            className="w-full max-w-lg p-4 border-b border-gray-700 pb-4 mb-4"
          >
            {/* Top Section */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-3 items-center">
                <img
                  src={assets.userAvatar} // Replace if you store avatar in DB
                  className="w-8 h-8 rounded-full object-cover"
                  alt="User Avatar"
                />
                <div className="flex items-center gap-3">
                  <h4 className="text-white text-md">{item.userId?.name}</h4>
                  <p className="text-gray-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="text-[#686bff] hover:bg-[#6366f1] hover:text-white px-1 py-1 rounded-md text-sm transition duration-300">
                Subscribe
              </button>
            </div>

            {/* Post Content */}
            <div className="text-gray-200 text-base mb-2">{item.text}</div>
              {item.mediaUrl && (
                <div className="w-full/2 mt-3">
                  <img src={item.mediaUrl} alt="" className="w-full max-w-96 max-h-96 object-cover rounded-md" />
                </div>
              )
              }
            {/* Action Buttons */}
            <div className="flex justify-start pl-6 gap-6 text-gray-400 text-md pt-2">
              <button className="flex items-center gap-1 hover:text-white transition">
                <FaRegHeart />
              </button>
              <button className="flex items-center gap-1 hover:text-white transition">
                <FaRegComment />
              </button>
              <button className="flex items-center gap-1 hover:text-white transition">
                <FaShare />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 mt-10">No posts found.</p>
      )}
    </div>
  );
};

export default Mainsection;
