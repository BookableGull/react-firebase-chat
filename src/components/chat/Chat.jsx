import { useEffect, useRef, useState } from "react"
import "./chat.css"
import EmojiPicker from "emoji-picker-react"
import {doc, onSnapshot} from "firebase/firestore";
import { db } from "../../lib/firebase";


const Chat = () => {
const [chat,setChat] = useState(false);
const [open,setOpen] = useState(false);
const [text,setText] = useState("");
const [img,setImg] = useState({
file: null,
url: "",
});

const { currentUser } = useUserStore() || {};
const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore() || {};

const endRef = useRef(null);



useEffect(()=>{
    endRef.current?.scrollIntoView({behavior: "smooth"})
},[])



const handleEmoji = e => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
}

const handleImg = e =>{
    if(e.target.files[0]){
    setImg({
        file:e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
    })
}
}

const handleSend = async ()=>{
    if(text === "") return;

    let imgURL = null;


    try {


        if(img.file){
            imgURL = await upload(img.file)
        }

        await update(doc(db, "chats", chatId), {
        messages:arrayUntion({
            senderId: currentUser.id,
            text,
            createdAt: new Date(),
            ...(imgURL && {img:imgURL}),
        }),
    })

    const userIDs = [currentUser.id, user.id];

    userIDs.forEach(async (id) =>{

    const userChatsRef = doc(db, "userchats", id);
    const userChatsSnapshot = await getDoc(userChatsRef);

    if(userChatsSnapshot.exists()){
        const userChatsData = userChatsSnapshot.data()

        const chatIndex = userChatsData.chats.findIndex(c=> c.chatId === chatId)

        userChatsData.chats[chatIndex].lastMessage = text
        userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true: false;
        userChatsData.chats[chatIndex].updatedAt = Date.now();

        await updateDoc(userChatsRef, {
            chats:userChatsData.chats,
        })
    
    }
})

   }   catch {
        console.log(err)
    }

    setImg({
        file:null,
        url:""
    })

    setText("");
}

useEffect(() => {
    const unSub = onSnapshot(doc(db,"chats", chatId), (res)=> {
        setChat(res.data())
    })

    return()=>{ 
        unSub();
    }
}, [chatId])

console.log(chat)

console.log(text)
    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || "./avatar.png"} alt=""/>
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p>Lol</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt=""/>
                    <img src="./video.png" alt=""/>
                    <img src="./info.png" alt=""/>
                </div>
                </div>
                <div className="center">   
                {    chat?.messages?.map(message=>(
<div className={message.senderId === currentUser?.id ? "message own" : "message"} key={message?.createdAt}>                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>
                                {message.txt}
                            </p>
                            {/* <span>{message}</span> */}
                        </div>
                    </div>
                    ))}
                    {img.url && <div className="message own">
                        <div className="texts">
                            <img src={img.url} alt=""/>
                        </div>
                    </div>}
                    <div ref={endRef}></div>
                </div>
                <div className="bottom">
                    <div className="icons">
                        <label htmlFor="file">
                        <img src="./img.png" alt=""/>
                        </label>
                        <input type="file" id ="file" style={{display:"none"}} onChange={handleImg}/>
                        <img src="./camera.png" alt=""/>
                        <img src="./mic.png" alt=""/>
                    </div>
                    <div className="icons"></div>
                    <input type="text" placeholder={isCurrentUserBlocked || isReceiverBlocked ? "You cannor send a message" : "Type a message..."} value={text} onChange={e=>setText(e.target.value)} disabled={isCurrentUserBlocked||isReceiverBlocked}/>                   
                    <div className="emoji">
                        <img src="./emoji.png" alt=""onClick={()=>setOpen(prev=>!prev)}/>
                        <div className="picker">
                            <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                        </div>
                    </div>
                    <button className="sendButton"onClick={handleSend} disabled = {isCurrentUserBlocked || isReceiverBlocked}>Send</button>
        </div>
        </div>
    )
}

export default Chat