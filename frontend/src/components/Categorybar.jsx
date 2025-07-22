import React ,{useState} from 'react'

const Categorybar = () => {
const categories = [
    "Home",
    "Following",
    "New BestSeller",
    "Food & Drink",
    "Culture",
    "Technology",
    "Travel",
    "Health",
    "Sports",
    "Fashion"
];

const [activeCategory, setActiveCategory] = useState(categories[0]);

return (
    <div className='px-4  sm:px-20'>
        <ul className="flex text-sm  font-medium items-center text-gray-500 dark:text-gray-400">
            {categories.map((category) => (
                <li key={category} className="me-2">
                    <button
                        onClick={() => setActiveCategory(category)}
                        className={`inline px-2 py-1 rounded-lg transition-colors ${
                            activeCategory === category ? "bg-white text-black"
                                : "text-gray-300 hover:bg-[#4b4b4b] dark:hover:bg-gray-800 dark:hover:text-white  bg-[#333333] "
                        }`}
                    >
                        {category}
                    </button>
                </li>
            ))}
        </ul>
    </div>
);
}

export default Categorybar
