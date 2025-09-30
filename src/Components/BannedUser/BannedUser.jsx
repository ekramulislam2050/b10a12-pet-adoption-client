

const BannedUser = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center " >

            {/* heading------------ */}
            <div className="flex justify-center p-2 mt-3">
                <h1 className="text-orange-300 text-4xl font-[kapakana]  tracking-wide sm:text-5xl font-semibold" >🚫 Access Denied</h1>
            </div>
            <div className="flex flex-col items-center ">
                <p className="mb-6 text-lg text-[#ffffff]">
                    Your account is currently <span className="font-semibold text-red-500">banned</span>.
                </p>
                <p className="text-sm text-[#ffffff]">
                    If you believe this is a mistake, please contact our support team.
                </p>
            </div>
        </div>
    );
};

export default BannedUser;