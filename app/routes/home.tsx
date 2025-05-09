import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ context,request }: Route.LoaderArgs) {
  const url = new URL(request.url)
  const response = await fetch(`${url.origin}/api`)
  if(!response.ok){
    console.log(`[Loader] : fetch api failed : ${response.status}`)
    return {message: "Fetch call failed"}
  }
  const rawData = await response.json()
  return rawData;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if(!loaderData) return <h1> Message from nowhere</h1>
  const {message} = loaderData
  console.log(message)
  return <h1>Message from {message}</h1>;
}
