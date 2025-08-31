"use client"

import { useNavigate } from "react-router";

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

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
  bio: z.string().min(2, {
    message: "Fullname must be at least 2 characters.",
  }),
})


const ProfileForm = () => {
  const { user, updateUserProfile } = useUser();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Fullname: "",
    },
  })
 
  // 2. Define a submit handler.
const onSubmit = async (values: z.infer<typeof formSchema>) => {
//   function onSubmit(values: z.infer<typeof formSchema>) {
    const updateProfile = await updateUserProfile(values);
    console.log(updateProfile)
    navigate(`/`);
    console.log(values)
  }

const updateBadge = async () => {
    const updateLevel = await updateUserLevel(user?.level + 1);
    console.log(updateBadge)
    navigate(`/quiz/quest`);
};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 bg-neutral-200/90 p-8 md:max-w-2xl max-w-sm m-auto mt-10 rounded-xl">
        <p1>Hi {user.username}, let's create your profile!</p1>
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

export default ProfileForm;