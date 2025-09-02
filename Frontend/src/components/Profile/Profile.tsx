"use client"

import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useUser } from '../../contexts/UserContext';
import { userProfile } from '../../services/userService';

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  bio: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
})




const Profile = () => {
  const { user, updateUserProfile } = useUser();
  const navigate = useNavigate();

  const [userPro, setUserProfile] = useState();

  const getProfile = async(userId) => {
    const getProfile = await userProfile(userId);
    setUserProfile(getProfile);
    console.log(getProfile);
  };


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: userPro?.user?.fullname || "",
      bio: userPro?.user?.fullname || "",
    },
  })
 
  // 2. Define a submit handler.
const onSubmit = async (values: z.infer<typeof formSchema>) => {
//   function onSubmit(values: z.infer<typeof formSchema>) {
    const updateProfile = await updateUserProfile(values);
    console.log(updateProfile)
  }


    useEffect(() => {
        getProfile(user?._id);
        console.log(user?._id)
    }, [user]); 



    useEffect(() => {
        if (userPro?.user) {
            form.reset({
            fullname: userPro.user.fullname || "",
            bio: userPro.user.bio || "",
            });
        }
    }, [userPro]); 


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 bg-neutral-200/90 p-8 md:max-w-2xl max-w-sm m-auto mt-10 rounded-xl">
        <div>Hi {userPro?.user?.fullname}, your profile!</div>
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="Fuecoco" {...field} />
              </FormControl>
              <FormDescription>
                This is your display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself!"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {/* You can <span>@mention</span> other users and organizations. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-full">Submit</Button>
      </form>
    </Form>
  )
}

export default Profile;