// @flow strict
import { personalData } from "@/utils/data/personal-data";

// Function to fetch individual blog by slug
async function getBlog(slug) {
  const res = await fetch(`https://dev.to/api/articles/${personalData.devUsername}/${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

// Function to generate static params for dynamic routes (required for static export)
export async function generateStaticParams() {
  // Fetch all blog posts for the user from dev.to
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  const posts = await res.json();

  // Map the fetched posts to an array of slugs
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Component to render blog details based on slug
async function BlogDetails({ params }) {
  const slug = params.slug; // Get the slug from the dynamic route params
  const blog = await getBlog(slug); // Fetch the blog data

  return (
    <div>
      {/* Render blog details */}
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.body_html }} />
    </div>
  );
}

export default BlogDetails;
