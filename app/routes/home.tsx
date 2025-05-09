import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useEffect ,useState} from "react";
import { useLoaderData } from "react-router";
import { healthCheck } from "workers/data";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({params,request}: Route.ClientLoaderArgs){
  try{
    const url = new URL(request.url)
    const response = await fetch(`${url.origin}/api`)
    if(response.ok){
      const rawData = await response.json() as { message: string };
      return rawData.message
    }else{
      console.log(`Error : ${response.statusText} : ${response.url}`)
      return null;
    }
  }catch(error){
    console.log("Error occured ")
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const messageFromLoader = useLoaderData()
  if(messageFromLoader) return <h1>Message from Loader {messageFromLoader}</h1>
  const [message, setMessage] = useState('')
  useEffect(() => {(async () => {
    const response = await fetch("/api")
    if(response.ok){
      const rawData = await response.json() as { message: string };
      setMessage(rawData.message)
    }else{
      setMessage("Failed to fetch message");
    }
  })()},[])
  
  console.log(message)
  return <h1>Message from {message}</h1>;
}
