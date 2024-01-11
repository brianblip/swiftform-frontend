import React from 'react'

export default function Login() {
    return (
        <div className='h-[100vh] bg-white w-screen flex justify-center items-center min-w-[352px]'>
            <div className='border rounded-lg border-gray-300 w-[80%] md:w-[50%] h-[80%] flex flex-col gap-9 justify-center max-h-[1300px] '>
                <p className='text-center font-extrabold text-4xl'>Welcome Back</p>
                <form className="w-full flex flex-col justify-center items-center">
                    <div className="mb-4 w-[60%] max-w-md">
                        <label className="block text-sm font-bold" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="border h-[52px] border-black w-full py-2 px-3 text-gray-700 leading-tight rounded-[4px]  focus:shadow-outline"
                            id="email"
                            placeholder="Email address"
                            type="email"
                        />
                    </div>
                    <div className='mb-4 w-[60%] max-w-md'>
                        <label className='block text-sm font-bold' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='border h-[52px] border-black w-full py-2 px-3 text-gray-700 leading-tight rounded-[4px]'
                            type='password'
                            placeholder='********'
                            id='password'
                        />

                    </div>
                    <button
                        type='submit'
                        className='border w-[60%] max-w-md rounded-md h-[52px] border-black py-2 px-3 bg-black text-white leading-tight '
                    >
                        Continue
                    </button>
                </form>
                <p className='text-center'>Don't have an account? Signup</p>
            </div>
        </div>
    )
}
