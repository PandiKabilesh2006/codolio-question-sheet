import {useState} from "react";
import useSheetStore from "../store/useSheetStore";
function Sheet(){
    const [topicTitle,setTopicTitle]=useState("");
    const addTopic=useSheetStore((state)=>state.addTopic);
    const topics=useSheetStore((state)=>state.topics);
    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Header section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                    Question Sheet
                </h2>
            
            <div className="flex gap-2">
                <input 
                type="text"
                value={topicTitle}
                onChange={(e)=>setTopicTitle(e.target.value)}
                placeholder="New topic name"
                className="border px-3 py-2 rounded"
                />
                <button 
                onClick={()=>{
                    if(topicTitle.trim()=="")return;
                    addTopic(topicTitle);
                    setTopicTitle("");
                }}
                className="bg-black text-white px-4 py-2 rounded">
                    + Add Topic
                </button>
            </div>
        </div>

            {/* Topics List */}
            <div className="space-y-3">
                {topics.length===0?(
                    <p className="text-gray-500">
                        No topics yet. Add your first topic.
                    </p>
                ):(
                    topics.map((topic)=>(
                        <div
                        key={topic.id}
                        className="border bg-white p-4 rounded"
                        >
                            {topic.title}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
export default Sheet;