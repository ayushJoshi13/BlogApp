import express from 'express';
import Note from '../models/Note.models.js'
import middleware from '../middlewares/middlewares.js'


const router = express.Router();

router.post('/add', middleware ,async(req , res)=>{
    try {
        const { title,description } = req.body;
       
        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        });
    
        await newNote.save();
        return res
          .status(200)
          .json({ success: true, message: "Note created successfully" });
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, message: "Error is Adding Note" });
      }
    
})

router.get('/', middleware, async(req, res)=>{
    try{
      const notes = await Note.find({userId:req.user.id});
      if (!notes) {
            return res.status(404).json({ success: false, message: "No notes found" });
        }
      return res.status(200).json({success:true, notes})
    }
    catch(error){
      console.log(error);
      
        return res.status(500).json({success:false, message:"can not retrive notes"})
    }
})

router.put('/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const updateNote = await Note.findByIdAndUpdate(id,req.body);
    return res.status(200).json({success:true, updateNote})
  }
  catch(error){
      return res.status(500).json({success:false, message:"can not update notes"})
  }
})

router.delete('/:id', async(req,res)=>{
  try{
    const {id} = req.params;
    const updateNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({success:true, updateNote})
  }
  catch(error){
      return res.status(500).json({success:false, message:"can not delete notes"})
  }
})
export default router;