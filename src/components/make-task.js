import {db} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

const makeTask = async(e) => {
  e.preventDefault()
  try{
    await addDoc(collection(db,'tasks'),{
      title: "title",
      description: "description",
      completed:false,
     //use the pause stop functionality you talked about with your mentor
    })
    onClose()
  } catch(err){
    alert(err)
  }


  return (
    
      <form onSubmit={makeTask} className='makeTask' name='makeTask'></form>

    
  )
}
  export default makeTask