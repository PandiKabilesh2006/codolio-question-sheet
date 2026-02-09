import {useState} from "react";
import useSheetStore from "../store/useSheetStore";
function Sheet(){
    const [topicTitle,setTopicTitle]=useState("");
    const [subtopicInputs,setSubtopicInputs]=useState("");

    const topics=useSheetStore((state)=>state.topics);
    const addTopic=useSheetStore((state)=>state.addTopic);
    const addSubtopic=useSheetStore((state)=>state.addSubtopic);

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
            <div className="space-y-4">
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
                            {/* Topic title */}
                            <h3 className="font-semibold text-lg">
                                {topic.title}
                            </h3>

                            {/* ------------- Add Subtopic ------------*/}
                            <div className="flex gap-2 mt-3">
                                <input type="text" 
                                value={subtopicInputs[topic.id] || ""}
                                onChange={(e)=>
                                    setSubtopicInputs({
                                        ...subtopicInputs,
                                        [topic.id]: e.target.value,

                                    })
                                }
                                placeholder="New subtopic"
                                className="border px-3 py-2 rounded text-sm"
                                />

                                <button 
                                onClick={()=>{
                                    const title=subtopicInputs[topic.id];
                                    if(!title?.trim()) return;

                                    addSubtopic(topic.id,title);

                                    setSubtopicInputs({
                                        ...subtopicInputs,
                                        [topic.id]:"",
                                    });
                                }}
                                className="bg-gray-800 text-white px-3 py-2 rounded text-sm"
                                >
                                    + Add Subtopic
                                </button>
                            </div>

                            {/* Subtopics List */}
                            <div className="mt-3 space-y-2">
                                {topic.subtopics.map((sub)=>(
                                    <div key={sub.id} className="ml-4 border-l pl-3 text-sm">
                                        {sub.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
export default Sheet;