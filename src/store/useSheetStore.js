import {create} from "zustand";

const useSheetStore=create((set)=>({

  topics:[],

  addTopic:(title)=>
    set((state)=>({
      topics:[
        ...state.topics,
        {
          id:Date.now(), 
          title:title,   
          subtopics:[],      
        },
      ],
    })),

  addSubtopic:(topicId,subtopicTitle)=>
    set((state)=>({
      topics:state.topics.map((topic)=>
        topic.id===topicId 
          ?{
              ...topic,
              subtopics:[
                ...topic.subtopics,
                {
                  id:Date.now(),  
                  title:subtopicTitle,
                  questions:[],  
                },
              ],
            }
          :topic    
      ),
    })),

  addQuestion:(topicId,subtopicId,questionTitle) =>
    set((state)=>({
      topics:state.topics.map((topic)=>
        topic.id===topicId
          ?{
              ...topic,
              subtopics:topic.subtopics.map((subtopic)=>
                subtopic.id===subtopicId
                  ?{
                      ...subtopic,
                      questions:[
                        ...subtopic.questions,
                        {
                          id: Date.now(), 
                          title:questionTitle, 
                        },
                      ],
                    }
                  :subtopic    
              ),
            }
          :topic                
      ),
    })),
}));

export default useSheetStore;
