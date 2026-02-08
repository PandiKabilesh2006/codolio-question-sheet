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
}));

export default useSheetStore;