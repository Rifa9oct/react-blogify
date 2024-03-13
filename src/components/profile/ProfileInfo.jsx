import MyBlogs from "./MyBlogs";
import ProfileBio from "./ProfileBio";
import ProfileImage from "./ProfileImage";

const ProfileInfo = () => {
    return (
        <div className="container">
            <div className="flex flex-col items-center py-8 text-center">
                <ProfileImage />
                <div>
                    <h3 className="text-2xl font-semibold text-white lg:text-[28px]">Saad Hasan</h3>
                    <p className="leading-[231%] lg:text-lg">saadhasan@gmail.com</p>
                </div>
                <ProfileBio />
            </div>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
            <MyBlogs/>
        </div>
    );
};

export default ProfileInfo;