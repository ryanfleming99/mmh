import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from "next/link"
import { getDoc, doc, collection, query } from "firebase/firestore"
import { firestore } from "../../lib/firebase/firebase"
import parse from 'html-react-parser';
import DOMPurify from "isomorphic-dompurify";
import { v4 as uuidv4 } from 'uuid';
import Spinner from "../Spinner"
const index = ({ id }) => {


    const [post, setPost] = useState([])

    const getPost = async () => {

        const querySnapshot = await getDoc(query(doc(firestore, "content", id)))
        // const postResult = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        // setPost(postResult)
        console.log(querySnapshot.data())
        setPost(querySnapshot.data())
    }

    useEffect(() => {
        if (firestore && id) {
            getPost()
        }

    }, [id, firestore])

    return (
        <div className=" mx-auto max-w-screen p-3 lg:px bg-gray-800 min-h-screen ">
            {/* <h1 className="text-white text-center text-2xl mt-12"> {post.title}</h1> */}
            {post.thumbnailImage && (
                <div className="w-11/12 lg:w-1/2 mx-auto">
                    <img src={post.thumbnailImage} className=" mx-auto object-cover w-[600px] h-[300px]" alt="Article header image" />
                </div>

            )}

            <article className="prose max-w-3xl mx-auto text-white prose-li:marker:text-white prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white mt-12">{parse(DOMPurify.sanitize(post.content))}</article>

            {/* -------------------Affiliate Links------------------------ */}
            {!post.affiliateProducts && (<div className="flex w-screen h-screen justify-center items-center"><Spinner /></div>)}
            {post?.affiliateProducts && (
                <div>
                    <hr className="h-[2px] my-8 bg-gray-200 border-0 w-full lg:w-8/12 mx-auto dark:bg-gray-700" />
                    <h3 className="lg:w-7/12 mx-auto font-semibold text-2xl text-center">Affiliate links</h3>
                </div>)}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto w-full lg:w-1/2 items-center mt-12">
                {post.affiliateProducts?.map((product, i) => (
                    <Link key={i} href={product.productLink}>
                        <div key={uuidv4()} className="mx-auto flex flex-row items-center">
                            <img className="mx-auto rounded-lg object-cover h-[150px] w-[150px] lg:h-[150px] lg:w-[180px]" src={product.imageLink} alt="" />
                            <div>
                                <h3 className="text-left pl-2 font-semibold w-full text-xl">{product.name}</h3>
                                <p className="text-lg text-left pl-2 mt-3 line-clamp-3">{product.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default index