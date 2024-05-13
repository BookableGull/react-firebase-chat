import "./addUser.css"
import {db} from "../../../../lib/firebase";
import {
    collection, query, serverTimestamp, where
} from "firebase/firestore";

import { useState } from "react";
import { getDocs } from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";


const AddUser = () => {
    const [user,setUser] = useState(null)

    const handleSearch = async e=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get("username")

        try{
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q)

            if(!querySnapShot.empty){
                setUser(querySnapShot.docs[0].data());
            }
            
        } catch(err) {
            console.log(err)
        }
    }

    const handleAdd = async()=>{

        const chatRef = collection(db, "chats")
        const userChatsRef = collection(db, "userchats")

        try{
            const newChatRef = doc(chatRef)

            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages:[],
            })

            console.log(newChatRef.id)
        } catch(err){
            console.log(err);
        }
    }
    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username"/>
                <button>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avatar.png"} alt=""/>
                    <span>{user.username}</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>}
            </div>
    )
}

export default AddUser