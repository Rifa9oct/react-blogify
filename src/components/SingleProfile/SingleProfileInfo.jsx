
const SingleProfileInfo = ({ profileInfo }) => {
    const avatarSrc = profileInfo.avatar ? `${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${profileInfo.avatar}` : null;

    const firstLetter = profileInfo.firstName.slice(0, 1);

    return (
        <div className="container">
            <div className="flex flex-col items-center py-8 text-center">
                <div
                    className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
                >
                    {
                        avatarSrc ? (
                            <img className="h-[120px] w-[120px] rounded-full" src={avatarSrc} alt="avatar" />
                        ) : (
                            <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
                                <span className="">{firstLetter}</span>
                            </div>
                        )
                    }
                </div>

                <div>
                    <h3 className="text-2xl font-semibold text-white lg:text-[28px]">{profileInfo.firstName} {profileInfo.lastName}</h3>
                    <p className="leading-[231%] lg:text-lg">{profileInfo.email}</p>
                </div>

                <p className="leading-[188%] text-gray-400 lg:text-lg mt-4">
                    {profileInfo.bio}
                </p>
            </div>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        </div>
    );
};

export default SingleProfileInfo;