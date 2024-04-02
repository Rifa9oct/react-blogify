import useAxios from "../hooks/useAxios";

const Comments = ({ singleBlog, refetch }) => {
    const { api } = useAxios();
        // console.log(singleBlog);
        
    return (
        <div className="mx-auto w-full md:w-10/12 container">
            <h2 className="text-3xl font-bold my-8">Comments (3)</h2>
            <div className="flex items -center space-x-4">
                <div className="avater-img bg-indigo-600 text-white">
                    <span className="">S</span>
                </div>
                <div className="w-full">
                    <textarea
                        className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                        placeholder="Write a comment"
                    ></textarea>
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Comment
                        </button>
                    </div>
                </div>
            </div>

            {/* Comment One*/}
            <div className="flex items-start space-x-4 my-8">
                <div className="avater-img bg-orange-600 text-white">
                    <span className="">S</span>
                </div>
                <div className="w-full">
                    <h5 className="text-slate -500 font-bold">Saad Hasan</h5>
                    <p className="text-slate-300">
                        Today I was mob programming with Square's Mobile & Performance Reliability team and we toyed with an
                        interesting idea. Our codebase has classes that represent screens a user can navigate to. These classes
                        are defined in modules, and these modules have an owner team defined. When navigating to a screen, we
                        wanted to have the owner team information available, at runtime. We created a build tool that looks at
                        about 1000 Screen classes, determines the owner team, and generates a className to do the lookup at runtime.
                        The generated code looked like this:
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Comments;