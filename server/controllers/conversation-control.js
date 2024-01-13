import conversation from "../models/Conversation.js"

export const newconversation=async(req,res)=>{
   try{ const senderid=req.body.senderId;
    const receiverId=req.body.receiverId;

    const exist= await conversation.findOne({members:{$all:[senderid,receiverId]} });
    if (exist !== null) {
        return res.status(200).json({ msg: "conversation already exists" });
    }
    const newconversation=new conversation({
        members:[senderid,receiverId],
    })
    await newconversation.save();
    return res.status(200).json("convo saved succeessfulllyyy");
}
catch (error) {
    console.error('Error while processing newconversation route:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
}
}
export const getconversation = async(req,res)=>{
    try{ const senderid=req.body.senderId;
        const receiverId=req.body.receiverId;
    
        let convo= await conversation.findOne({members:{$all:[senderid,receiverId]} });
        return res.status(200).json(convo);
    }
    catch (error) {
        console.error('Error while processing getconversation route:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}