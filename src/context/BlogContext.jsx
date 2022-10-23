import axios from "axios";
import { createContext, useState } from "react";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
  const [detailLoading, setDetailLoading] = useState(true)

  const [blogDetail, setBlogDetail] = useState([]);

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
  async function getOneBlog(slug) {
    const token = window.atob(sessionStorage.getItem('token'));

    try {
      var config = {
        method: 'get',
        url: `${base_url}api/posts/${slug}`,
        headers: {
          'Authorization': `Token ${token}`,
        }
      };
      const result = await axios(config);
      setDetailLoading(false);
      console.log(result.data);
      setBlogDetail(result.data);
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const setComments = async (slug, commendData) => {
    const token = window.atob(sessionStorage.getItem('token'));
    const commentUrl = base_url + `api/posts/${slug}/add_comment/`;
    try {
      const data = {
        "content": commendData
      };
      var config = {
        method: 'post',
        url: commentUrl,
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        data : data
      };
      await axios(config)
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  let value = {
    blogs,
    setBlogs,
    getBlogs,
    getOneBlog,
    blogDetail,
    detailLoading,
    setComments
  }

  return (
    <BlogContext.Provider value={value}>
      {props.children}
    </BlogContext.Provider>
  )
}

export default BlogContextProvider;