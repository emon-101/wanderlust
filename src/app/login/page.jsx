"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    console.log({ data, error });

    if (data) {
      alert(`Login Successful for ${data.user.name}`);
      redirect("/");
    }
    if (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  return (
    <div className="lg:w-1/2 mx-auto my-10">
      <div className="text-center">
        <h1 className="text-3xl font-medium">Please Login</h1>
        <p className="text-zinc-500 mt-1 mb-4">
          Start your adventure with Wanderlust
        </p>
      </div>
      <Card className="border p-10">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email Address</Label>
            <Input placeholder="Enter you email" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>
          <div className="flex gap-2">
            <Button className={"w-full"} type="submit">
              Login
            </Button>
          </div>
        </Form>
        <div className="flex justify-center items-center">
          <Separator />
          <div className="whitespace-nowrap px-2">or sign up with</div>
          <Separator />
        </div>
        <div className="">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className={"w-full flex items-center"}
            type="submit"
          >
            <FcGoogle /> Sign In with google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
