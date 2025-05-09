export async function healthCheck(endpoint:string){
    const response = await fetch(endpoint)
    return response
}
