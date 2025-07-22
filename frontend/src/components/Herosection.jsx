import React , {useEffect  , useState} from 'react'
import Categorybar from './Categorybar'
import Posts from './Posts'
import Input from './Input'
const Herosection = () => {


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
    <div className='pt-[20px] px-4 sm:px-10 md:pl-12'>
      <Categorybar/>
      <div className='flex flex-col items-center justify-center pt-4'>
        <Input />
      <Posts   posts={post}/>
      </div>
    </div>
  )
}

export default Herosection
  