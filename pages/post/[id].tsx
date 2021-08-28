import {MainLayout} from "../../components/MainLayout";
import Link from "next/link";
import {useState, useEffect} from 'react'
import {useRouter} from "next/router";
import {NextPageContext} from "next";
import {MyPost} from "../../interfaces/post";


interface PostPageProps {
    post: MyPost
}

export default function Post({post:serverPost}:PostPageProps) {
    const {query} = useRouter()
    const [post, setPost] = useState(serverPost)
    

    useEffect(()=> {
        const loadPost = async () => {
            const response = await fetch(`${process.env.API_URL}/posts/${query.id}`)
            const upPost = await response.json()
            setPost(upPost)
        }
       if (!serverPost){
           loadPost()
       }
    },[])

    return <MainLayout>
        {post ?
            <>
                <h2>{post.title}</h2>
                <hr/>
                <p>
                    {post.body}
                </p>
                <Link href='/posts'><a>Back to posts</a></Link>
            </>
            :<h2>Loading.....</h2>}

    </MainLayout>

}
interface PostNextPageContecst extends NextPageContext {
    query:{
        id: string
    }
}

Post.getInitialProps = async ({query, req} : PostNextPageContecst) => {
    if (!req){
        return {post:null}
    }
    const response = await fetch(`${process.env.API_URL}/posts/${query.id}`)
    const post:MyPost = await response.json()
    return {
        post
    }
}