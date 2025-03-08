import SnippetsMain from "./_components/SnippetsMain";
import axios from "axios";

const getSnippetData = async() => {
  try{
    const langDataRequest = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/snippet`);
    const langRequestResponse = langDataRequest.data;
    return langRequestResponse.data;
  }catch(error:any){
    return {error:error.message};
  }
}

async function SnippetsPage() {
  const snippetResponse = await getSnippetData();
  return (
    <SnippetsMain snippets={snippetResponse?.length > 0 ? snippetResponse : []}/>
  )
}
export default SnippetsPage;
