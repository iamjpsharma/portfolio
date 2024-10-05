// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

async function getBlogs() {
  const url = `https://dev.to/api/articles/me`; // Endpoint to fetch articles for the authenticated user
  console.log("url-- ", url);

  try {
      const res = await fetch(url, {
          method: 'GET',
          headers: {
              'Accept': 'application/vnd.forem.api-v1+json',
              'api-key': process.env.DEV_TO_API_KEY // Make sure this environment variable is set
          }
      });

      console.log("res-- ", res.body);
      
      // Check if the response is OK (status in the range 200-299)
      if (!res.ok) {
          throw new Error('Failed to fetch data');
      }

      const textData = await res.text(); // Read the response as text
      console.log("Raw Response Data: ", textData); // Log the raw response
      
      const data = JSON.parse(textData); // Parse it manually
      console.log("Fetched Data: ", data); // Log the parsed data
      
      return data; // Return the fetched data

  } catch (error) {
      console.error("Error fetching data: ", error); // Log any errors that occur
      throw error; // Re-throw the error for further handling if needed
  }
}

async function page() {
  const blogs = await getBlogs();
console.log( "blogs-- ", blogs);

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.map((blog, i) => (
            blog?.cover_image &&
            <BlogCard blog={blog} key={i} />
          ))
        }
      </div>
    </div>
  );
};

export default page;