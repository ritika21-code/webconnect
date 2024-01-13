import message from "../models/message.js";
import conversation from "../models/Conversation.js"

export const newmessage =async(req,res)=>{
    const newMessage= new message(req.body)
    try{
       await newMessage.save();
       await conversation.findByIdAndUpdate(req.body.conversationid, {message: req.body.text})
       return res.status(200).json(newMessage);
     }
    catch (error) {
        res.status(500).json(error);
    }

}
export const getmessage =async(request,response)=>{
  try {
            const messages = await message.find({ conversationId: request.params.id });
            return response.status(200).json(messages);
        } catch (error) {
           return response.status(500).json(error);
        }
}