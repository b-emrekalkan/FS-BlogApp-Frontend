import axios from "axios";
import { createContext, useState } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

export const BlogContext = createContext();

const BlogContextProvider = (props)=>{

    const [blogs, setBlogs] = useState([]);

    const base_url = "http://127.0.0.1:8000/"

    const getBlogs = async () => {

        const blogUrl = base_url + "api/posts/"
        try {
            const res = await axios.get(blogUrl)
            setBlogs(res.data.results)
            // toastSuccessNotify('Posts fetched successfully.')
            return res;
        } catch (error) {
            toastErrorNotify(error.message)
        }
    }

    function getOneBlog(slug) {
        const result = blogs?.filter((item) => item.slug === slug);
        return result;
      }

    let value = {
        blogs,
        setBlogs,
        getBlogs,
        getOneBlog
     }

    return (
        <BlogContext.Provider value={value}>
          {props.children}
        </BlogContext.Provider>
      )
}

export default BlogContextProvider;