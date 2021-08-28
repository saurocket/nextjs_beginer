import {useState, useEffect} from 'react'
import {MainLayout} from "../components/MainLayout";
import Link from "next/link";
import {MyPost} from "../interfaces/post";
import {NextPageContext} from "next";

interface PostsPageProps {
    posts: Array<MyPost>
}

export default function Posts({posts:serverPosts}:PostsPageProps) {

   const [posts, setPosts] = useState(serverPosts)

   useEffect(()=> {
       const load = async () => {
           const response = await fetch(`${process.env.API_URL}/posts`)
           const posts = await response.json()
           setPosts(posts)
       }
       if (!serverPosts){
           load()
       }
   },[])



     return <MainLayout title='Post Page'>
         {posts ? <>
             <h2>Posts Page</h2>
             <ul>
                 {posts.map(post=> {
                     return <li key={post.id}>
                         <Link
                             href={`/post/[id]`} as={`/post/${post.id}`}

                         ><a>{post.title}</a></Link>
                     </li>
                 })}
             </ul>
         </>
             : <h2>Loading posts...</h2>
         }

    </MainLayout>
}


Posts.getInitialProps = async ({req}: NextPageContext) => {
    if (!req){
        return {posts: null}
    }
    const response = await fetch(`${process.env.API_URL}/posts`)
    const posts:Array<MyPost> = await response.json()
    return {
        posts
    }
}

// export async function getServerSideProps({req}) {
//     const response = await fetch('http://localhost:4200/posts')
//     const posts = await response.json()
//
//     return {
//         props: {posts}, // will be passed to the page component as props
//     }
// }
