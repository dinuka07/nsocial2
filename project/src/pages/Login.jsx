import React, { useState } from "react";
import { TbSocial } from "react-icons/tb";
import { ImConnection } from "react-icons/im";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { CustomButton, Loading, TextInput } from "../components";
import { useForm } from "react-hook-form";
import BgImg from "../assets/img.jpeg";
import { Link } from "react-router-dom";
import { apiRequest } from "../utils";
import { useDispatch } from "react-redux";
import { UserLogin } from "../redux/userSlice";

const Login = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrMsg("");
    try {
      const res = await apiRequest({
        url: "/auth/login",
        data: data,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        setErrMsg("");

        const newData = { token: res?.token, ...res?.user };
        dispatch(UserLogin(newData));
        window.location.replace("/");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full h-[100vh] bg-bgColor flex items-center justify-center p-6'>
      <div className='flex w-full py-8 overflow-hidden shadow-xl md:w-2/3 h-fit lg:h-full 2xl:h-5/6 lg:py-0 bg-primary rounded-xl'>
        {/* LEFT */}
        <div className='flex flex-col justify-center w-full h-full p-10 lg:w-1/2 2xl:px-20'>
          <div className='flex items-center w-full gap-2 mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <TbSocial />
            </div>
            <span className='text-2xl text-[#065ad8] font-semibold'>
              NBOOK
            </span>
          </div>
          <p className='text-base font-semibold text-ascent-1'>
            Log in to your account
          </p>
          <span className='text-sm nt-2 text-ascent-2'>Welcome back,</span>

          <form
            className='flex flex-col gap-5 py-8'
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              name='email'
              label='Email Address'
              placeholder='email@example.com'
              type='email'
              register={register("email", {
                required: "Email Address is required!",
              })}
              styles='w-full rounded-full'
              labelStyle='ml-2'
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
              styles='w-full rounded-full'
              labelStyle='ml-2'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
              to='/reset-password'
              className='text-sm font-semibold text-right text-blue'
            >
              Forgot Password ?
            </Link>

            {errMsg?.message && (
              <span
                role='alert'
                className={`text-sm ${
                  errMsg?.status === "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title='Login'
              />
            )}
          </form>

          <p className='text-sm text-center text-ascent-2'>
            Don't have an account?{" "}
            <Link
              to='/register'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='flex-col items-center justify-center hidden w-1/2 h-full lg:flex bg-blue'>
          <div className='relative flex items-center justify-center w-full'>
            <img
              src={BgImg}
              alt='Bg Image'
              className='object-cover w-48 h-48 rounded-full 2xl:w-64 2xl:h-64'
            />
            <div className='absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full right-10 top-10'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>
            <div className='absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full left-10 top-6'>
              <ImConnection />
              <span className='text-xs font-medium'>Connect</span>
            </div>
            <div className='absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full left-12 bottom-6'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-base text-white'>
              Connect with friedns & have share for fun
            </p>
            <span className='text-sm text-white/80'>
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
